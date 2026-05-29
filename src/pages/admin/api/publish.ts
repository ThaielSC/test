export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Octokit } from '@octokit/rest';

// Interfaz esperada desde el cliente
interface DraftPayload {
  collection: string;
  slug: string;
  data: any;
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Verificación extra de seguridad en el endpoint
  if (!locals.user) {
    return new Response(JSON.stringify({ success: false, message: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const drafts = body.drafts;

    if (!Array.isArray(drafts) || drafts.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'No hay borradores para publicar' }), { status: 400 });
    }

    // Configuración de GitHub
    const isGithubMode = !!process.env.GITHUB_TOKEN;
    const octokit = isGithubMode ? new Octokit({ auth: process.env.GITHUB_TOKEN }) : null;
    const githubOwner = process.env.GITHUB_OWNER || '';
    const githubRepo = process.env.GITHUB_REPO || '';
    const githubBranch = process.env.GITHUB_BRANCH || 'main';

    for (const draft of drafts as DraftPayload[]) {
      if (!draft.slug || !draft.collection || !draft.data) continue;
      
      const fileName = `${draft.slug}.json`;
      const repoFilePath = `src/content/${draft.collection}/${fileName}`;

      if (isGithubMode && octokit) {
        // ==== MODO PRODUCCIÓN (GITHUB API) ====
        try {
          let sha = undefined;
          
          // 1. Intentar obtener el SHA si el archivo existe
          try {
            const { data: fileData } = await octokit.repos.getContent({
              owner: githubOwner,
              repo: githubRepo,
              path: repoFilePath,
              ref: githubBranch
            });
            if (!Array.isArray(fileData) && fileData.type === 'file') {
              sha = fileData.sha;
            }
          } catch (err: any) {
            if (err.status !== 404) throw err; // Si es 404, el archivo es nuevo
          }

          if (draft.data._deleted) {
            // Acción: Eliminar en GitHub
            if (sha) {
              await octokit.repos.deleteFile({
                owner: githubOwner,
                repo: githubRepo,
                path: repoFilePath,
                message: `CMS: Eliminado ${draft.collection}/${fileName}`,
                sha,
                branch: githubBranch
              });
              console.log(`✅ GitHub Eliminado: ${repoFilePath}`);
            }
          } else {
            // Acción: Crear/Actualizar en GitHub
            const { _deleted, ...dataToSave } = draft.data;
            const fileContent = JSON.stringify(dataToSave, null, 2) + '\n';
            const contentBase64 = Buffer.from(fileContent).toString('base64');
            
            await octokit.repos.createOrUpdateFileContents({
              owner: githubOwner,
              repo: githubRepo,
              path: repoFilePath,
              message: `CMS: Actualizado ${draft.collection}/${fileName}`,
              content: contentBase64,
              sha,
              branch: githubBranch
            });
            console.log(`✅ GitHub Guardado: ${repoFilePath}`);
          }
        } catch (err) {
          console.error(`❌ Error de API GitHub en ${repoFilePath}:`, err);
          throw new Error(`Falló la conexión con GitHub para ${fileName}`);
        }
      } else {
        // ==== MODO DESARROLLO (LOCAL FS) ====
        const localFilePath = path.join(process.cwd(), 'src', 'content', draft.collection, fileName);
        
        // Ignoramos la propiedad _deleted al guardar un archivo
        const { _deleted, ...dataToSave } = draft.data;
        const fileContent = JSON.stringify(dataToSave, null, 2) + '\n';
        
        try {
          if (draft.data._deleted) {
            // Acción de eliminar
            try {
              await fs.unlink(localFilePath);
              console.log(`✅ Eliminado: ${draft.collection}/${fileName}`);
            } catch (err: any) {
              if (err.code !== 'ENOENT') throw err; // Ignorar si el archivo ya no existe
            }
          } else {
            // Acción de crear/actualizar
            await fs.writeFile(localFilePath, fileContent, 'utf-8');
            console.log(`✅ Guardado: ${draft.collection}/${fileName}`);
          }
        } catch (err) {
          console.error(`❌ Error procesando ${localFilePath}:`, err);
          throw new Error(`No se pudo procesar el archivo ${fileName}`);
        }
      }
    }

    // Respuesta exitosa al procesar todos los borradores
    if (isGithubMode) {
      return new Response(JSON.stringify({ success: true, message: 'Cambios subidos a GitHub.' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: true, message: 'Archivos locales actualizados.' }), { status: 200 });
    }

  } catch (error: any) {
    console.error('Error en Publish API:', error);
    return new Response(JSON.stringify({ success: false, message: error.message || 'Error interno del servidor' }), { status: 500 });
  }
};
