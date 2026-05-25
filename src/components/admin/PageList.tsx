import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAllDrafts, type Draft } from '../../lib/store';

interface Page {
  id: string;
  slug: string;
  collection: string;
  data: {
    title: string;
    description?: string;
    sections: any[];
  };
}

interface Props {
  initialPages: Page[];
}

export default function PageList({ initialPages }: Props) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [displayPages, setDisplayPages] = useState<Page[]>(initialPages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDrafts() {
      const localDrafts = await getAllDrafts();
      const pageDrafts = localDrafts.filter(d => d.collection === 'pages');
      setDrafts(pageDrafts);
      
      const mergedPages = initialPages.map(p => {
        const draft = pageDrafts.find(d => d.slug === p.slug);
        if (draft) {
          return { ...p, data: draft.data };
        }
        return p;
      });
      
      setDisplayPages(mergedPages);
      setIsLoading(false);
    }
    loadDrafts();
  }, [initialPages]);

  const hasDraft = (slug: string) => drafts.some(d => d.slug === slug);

  return (
    <div class="product-list-container">
      <div class="header-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Tus Páginas</h2>
      </div>

      <div class="table-container" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--c-bg)', borderBottom: '1px solid var(--c-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Página</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Secciones</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayPages.map(page => {
              const isDraft = hasDraft(page.slug);
              return (
                <tr key={page.slug} style={{ borderBottom: '1px solid var(--c-border)', background: isDraft ? 'rgba(212, 146, 42, 0.05)' : 'transparent', transition: 'background 0.3s' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong>{page.data.title}</strong>
                      <span style={{ color: 'var(--c-text-muted)', fontSize: '0.85rem' }}>/{page.slug === 'home' ? '' : page.slug}</span>
                      {isDraft && (
                        <span style={{ background: 'var(--c-accent)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Modificado
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--c-text-muted)', fontSize: '0.9rem' }}>
                    {page.data.sections?.length || 0} bloques de contenido
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <a 
                      href={`/admin/pages/${page.slug}`} 
                      style={{ 
                        color: 'var(--c-primary)', 
                        textDecoration: 'none', 
                        fontWeight: 500,
                        border: '1px solid var(--c-border)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => (e.currentTarget.style.background = 'var(--c-bg)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      Editar Contenido
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
