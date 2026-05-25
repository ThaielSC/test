import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAllDrafts, type Draft } from '../../lib/store';

interface Product {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    name: string;
    price: number;
    category: string;
    available?: boolean;
    image: string;
  };
}

interface Props {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: Props) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar borradores locales y fusionarlos con los datos del servidor
  useEffect(() => {
    async function loadDrafts() {
      const localDrafts = await getAllDrafts();
      const productDrafts = localDrafts.filter(d => d.collection === 'products');
      setDrafts(productDrafts);
      
      // Sobrescribir los datos visuales con los borradores locales
      const mergedProducts = initialProducts.map(p => {
        const draft = productDrafts.find(d => d.slug === p.slug);
        if (draft) {
          return { ...p, data: draft.data, _isNewDraft: false };
        }
        return { ...p, _isNewDraft: false };
      });
      
      // Añadir borradores que son completamente nuevos (no existen en initialProducts)
      const newDrafts = productDrafts.filter(d => !initialProducts.some(p => p.slug === d.slug));
      newDrafts.forEach(d => {
        mergedProducts.push({
          id: d.slug,
          slug: d.slug,
          collection: d.collection,
          body: '',
          data: d.data,
          _isNewDraft: true
        } as any);
      });
      
      setDisplayProducts(mergedProducts);
      setIsLoading(false);
    }
    loadDrafts();
  }, [initialProducts]);

  const hasDraft = (slug: string) => drafts.some(d => d.slug === slug);

  return (
    <div class="product-list-container">
      <div class="header-actions" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Tus Productos</h2>
        <a href="/admin/products/new" class="btn btn-primary" style={{ background: 'var(--c-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', textDecoration: 'none', fontWeight: 600 }}>
          + Nuevo Producto
        </a>
      </div>

      <div class="table-container" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--c-bg)', borderBottom: '1px solid var(--c-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Producto</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Categoría</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Precio</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Estado</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--c-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayProducts.map((product: any) => {
              const isDraft = hasDraft(product.slug);
              const isDeleted = product.data._deleted === true;
              const isNewDraft = product._isNewDraft === true;
              
              return (
                <tr key={product.slug} style={{ borderBottom: '1px solid var(--c-border)', background: isDeleted ? '#FEE2E2' : (isDraft ? 'rgba(212, 146, 42, 0.05)' : 'transparent'), transition: 'background 0.3s', opacity: isDeleted ? 0.7 : 1 }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--c-bg)', borderRadius: '8px', padding: '5px' }}>
                        <img src={product.data.image} alt={product.data.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <strong style={{ textDecoration: isDeleted ? 'line-through' : 'none' }}>{product.data.name || product.slug}</strong>
                        {isDeleted && (
                          <span style={{ background: '#DC2626', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            A Eliminar
                          </span>
                        )}
                        {!isDeleted && isNewDraft && (
                          <span style={{ background: '#10B981', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Nuevo
                          </span>
                        )}
                        {!isDeleted && !isNewDraft && isDraft && (
                          <span style={{ background: 'var(--c-accent)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Modificado
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: 'var(--c-bg)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>
                      {product.data.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>${product.data.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    {isDraft ? (
                      <span style={{ color: '#D97706', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#D97706', borderRadius: '50%' }}></span>
                        Borrador local
                      </span>
                    ) : (
                      <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#059669', borderRadius: '50%' }}></span>
                        Publicado
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <a 
                      href={`/admin/products/${product.slug}`} 
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
                      Editar
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
