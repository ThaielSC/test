import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAllDrafts, deleteDraft, type Draft } from '../../lib/store';

export default function CheckpointManager() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    async function load() {
      const localDrafts = await getAllDrafts();
      setDrafts(localDrafts);
      setIsLoading(false);
    }
    load();
  }, []);

  const handlePublish = async () => {
    if (drafts.length === 0) return;
    
    setIsPublishing(true);
    setMessage(null);

    try {
      const res = await fetch('/admin/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drafts })
      });

      const result = await res.json();

      if (result.success) {
        // Limpiar IndexedDB porque ya se guardaron en los archivos reales
        await Promise.all(drafts.map(d => deleteDraft(d.collection, d.slug)));
        setDrafts([]);
        setMessage({ type: 'success', text: '¡Cambios publicados exitosamente!' });
        
        // Recargar para que Astro refresque SSR
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage({ type: 'error', text: result.message || 'Error al publicar' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscardAll = async () => {
    if (confirm('¿Estás totalmente seguro? Perderás todos tus cambios locales no publicados.')) {
      await Promise.all(drafts.map(d => deleteDraft(d.collection, d.slug)));
      setDrafts([]);
    }
  };

  if (isLoading) return <div style={{ padding: '2rem' }}>Cargando estado...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {message && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '2rem', 
          background: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
          color: message.type === 'success' ? '#065F46' : '#991B1B',
          fontWeight: 500,
          border: `1px solid ${message.type === 'success' ? '#34D399' : '#F87171'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>Cambios Pendientes</h2>
            <p style={{ color: 'var(--c-text-muted)', margin: 0 }}>
              {drafts.length === 0 
                ? 'Todo está al día. No hay borradores locales sin publicar.' 
                : `Tienes ${drafts.length} cambios locales esperando para salir en vivo.`}
            </p>
          </div>
        </div>

        {drafts.length > 0 && (
          <div style={{ padding: '2rem' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {drafts.map(draft => (
                <li key={`${draft.collection}-${draft.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--c-bg)', borderRadius: '8px', border: '1px solid var(--c-border)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-accent)', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                      {draft.collection}
                    </span>
                    <strong style={{ fontSize: '1.1rem' }}>{draft.data.name || draft.slug}</strong>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                    Editado hace {Math.round((Date.now() - draft.updatedAt) / 60000)} min
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={handleDiscardAll}
                disabled={isPublishing}
                style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid var(--c-border)', background: 'transparent', color: 'var(--c-text-muted)', fontWeight: 600, cursor: 'pointer' }}
              >
                Descartar Todo
              </button>
              
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                style={{ padding: '0.8rem 2rem', borderRadius: '8px', border: 'none', background: 'var(--c-primary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {isPublishing ? 'Sincronizando...' : 'Publicar Ahora (Crear Checkpoint)'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(212, 146, 42, 0.05)', borderRadius: '12px', border: '1px solid rgba(212, 146, 42, 0.2)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--c-accent)', marginBottom: '0.5rem' }}>¿Cómo funciona?</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: 1.6, margin: 0 }}>
          Al publicar, Greda CMS detectará tu entorno. Si estás desarrollando en tu máquina local, actualizará los archivos JSON directamente. 
          Si estás en producción (como Vercel o Cloudflare), utilizará la API de Github para crear un nuevo <em>commit</em> en la rama <code>drafts</code>, 
          generando un registro permanente de todos los cambios de esta versión.
        </p>
      </div>
    </div>
  );
}
