import fs from 'node:fs/promises';
import nodePath from 'node:path';
import { Octokit } from '@octokit/rest';

const prerender = false;
const POST = async ({
  request,
  locals
}) => {
  if (!locals.user) {
    return new Response(JSON.stringify({
      success: false,
      message: "No autorizado"
    }), {
      status: 401
    });
  }
  try {
    const body = await request.json();
    const drafts = body.drafts;
    if (!Array.isArray(drafts) || drafts.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: "No hay borradores para publicar"
      }), {
        status: 400
      });
    }
    const isGithubMode = !!process.env.GITHUB_TOKEN;
    const octokit = isGithubMode ? new Octokit({
      auth: process.env.GITHUB_TOKEN
    }) : null;
    const githubOwner = process.env.GITHUB_OWNER || "";
    const githubRepo = process.env.GITHUB_REPO || "";
    const githubBranch = process.env.GITHUB_BRANCH || "main";
    for (const draft of drafts) {
      if (!draft.slug || !draft.collection || !draft.data) continue;
      const fileName = `${draft.slug}.json`;
      const repoFilePath = `src/content/${draft.collection}/${fileName}`;
      if (isGithubMode && octokit) {
        try {
          let sha = void 0;
          try {
            const {
              data: fileData
            } = await octokit.repos.getContent({
              owner: githubOwner,
              repo: githubRepo,
              path: repoFilePath,
              ref: githubBranch
            });
            if (!Array.isArray(fileData) && fileData.type === "file") {
              sha = fileData.sha;
            }
          } catch (err) {
            if (err.status !== 404) throw err;
          }
          if (draft.data._deleted) {
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
            const {
              _deleted,
              ...dataToSave
            } = draft.data;
            const fileContent = JSON.stringify(dataToSave, null, 2) + "\n";
            const contentBase64 = Buffer.from(fileContent).toString("base64");
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
        const localFilePath = nodePath.join(process.cwd(), "src", "content", draft.collection, fileName);
        const {
          _deleted,
          ...dataToSave
        } = draft.data;
        const fileContent = JSON.stringify(dataToSave, null, 2) + "\n";
        try {
          if (draft.data._deleted) {
            try {
              await fs.unlink(localFilePath);
              console.log(`✅ Eliminado: ${draft.collection}/${fileName}`);
            } catch (err) {
              if (err.code !== "ENOENT") throw err;
            }
          } else {
            await fs.writeFile(localFilePath, fileContent, "utf-8");
            console.log(`✅ Guardado: ${draft.collection}/${fileName}`);
          }
        } catch (err) {
          console.error(`❌ Error procesando ${localFilePath}:`, err);
          throw new Error(`No se pudo procesar el archivo ${fileName}`);
        }
      }
    }
    if (isGithubMode) {
      return new Response(JSON.stringify({
        success: true,
        message: "Cambios subidos a GitHub."
      }), {
        status: 200
      });
    } else {
      return new Response(JSON.stringify({
        success: true,
        message: "Archivos locales actualizados."
      }), {
        status: 200
      });
    }
  } catch (error) {
    console.error("Error en Publish API:", error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || "Error interno del servidor"
    }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
