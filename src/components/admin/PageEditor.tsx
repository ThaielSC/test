import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { saveDraft, getDraft, deleteDraft } from '../../lib/store';

interface PageSection {
  type: string;
  content: Record<string, any>;
}

interface PageData {
  title: string;
  slug: string;
  description?: string;
  sections: PageSection[];
}

interface Page {
  id: string;
  slug: string;
  collection: string;
  data: PageData;
}

interface Props {
  initialPage: Page;
}

export default function PageEditor({ initialPage }: Props) {
  const [page, setPage] = useState<Page>(initialPage);
  const [isDraft, setIsDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadDraft() {
      const draft = await getDraft(initialPage.collection, initialPage.slug);
      if (draft) {
        setPage({ ...initialPage, data: draft.data });
        setIsDraft(true);
      }
    }
    loadDraft();
  }, [initialPage.slug, initialPage.collection]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveDraft(page.collection, page.slug, page.data);
    setIsDraft(true);
    setIsSaving(false);
    window.location.href = '/admin/pages';
  };

  const handleDiscard = async () => {
    if (confirm('¿Descartar cambios?')) {
      await deleteDraft(page.collection, page.slug);
      setPage(initialPage);
      setIsDraft(false);
    }
  };

  const handleMetaChange = (e: any) => {
    const { name, value } = e.target;
    setPage(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      }
    }));
  };

  const handleSectionChange = (sectionIndex: number, key: string, value: string) => {
    setPage(prev => {
      const newSections = [...prev.data.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        content: {
          ...newSections[sectionIndex].content,
          [key]: value
        }
      };
      return {
        ...prev,
        data: {
          ...prev.data,
          sections: newSections
        }
      };
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
      
      {/* Editor Central */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Metadatos SEO */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--c-border)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: 'var(--c-primary)' }}>Metadatos de la Página</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Título de la Página</label>
              <input 
                type="text" 
                name="title" 
                value={page.data.title} 
                onChange={handleMetaChange}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Descripción (SEO)</label>
              <textarea 
                name="description" 
                value={page.data.description || ''} 
                onChange={handleMetaChange}
                rows={3}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>
        </div>

        {/* Secciones Dinámicas */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--c-border)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: 'var(--c-primary)' }}>Bloques de Contenido</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {page.data.sections.map((section, idx) => (
              <div key={idx} style={{ padding: '1.5rem', background: 'var(--c-bg)', borderRadius: '8px', border: '1px solid var(--c-border)' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--c-accent)' }}>
                  Sección: {section.type}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Object.entries(section.content).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-text-muted)', textTransform: 'capitalize' }}>
                        {key}
                      </label>
                      {typeof val === 'string' && val.length > 50 ? (
                        <textarea 
                          value={val as string}
                          onChange={(e: any) => handleSectionChange(idx, key, e.target.value)}
                          rows={3}
                          style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--c-border)', fontFamily: 'inherit', resize: 'vertical' }}
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={val as string}
                          onChange={(e: any) => handleSectionChange(idx, key, e.target.value)}
                          style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--c-border)' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button 
              onClick={handleSave}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--c-primary)', color: 'white', fontWeight: 600, cursor: 'pointer' }}
            >
              {isSaving ? 'Guardando...' : 'Guardar Borrador'}
            </button>
            <button 
              disabled={!isDraft}
              onClick={handleDiscard}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--c-border)', background: 'transparent', color: isDraft ? 'var(--c-danger)' : 'var(--c-text-muted)', fontWeight: 600, cursor: isDraft ? 'pointer' : 'not-allowed' }}
            >
              Descartar
            </button>
          </div>
        </div>

      </div>

      {/* Preview JSON de la página */}
      <div style={{ position: 'sticky', top: '80px' }}>
        <div style={{ background: '#1E1E1E', color: '#D4D4D4', borderRadius: '12px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
          <div style={{ background: '#2D2D2D', padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>Estructura de la Página</span>
            <span style={{ color: '#858585' }}>JSON</span>
          </div>
          <pre style={{ padding: '1rem', margin: 0, fontSize: '0.75rem', overflowX: 'auto', whiteSpace: 'pre-wrap', maxHeight: '70vh', overflowY: 'auto' }}>
            {JSON.stringify(page.data, null, 2)}
          </pre>
        </div>
      </div>
      
    </div>
  );
}
