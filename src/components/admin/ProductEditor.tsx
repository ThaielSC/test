import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { saveDraft, getDraft, deleteDraft } from '../../lib/store';

interface ProductData {
  name: string;
  price: number;
  category: string;
  available?: boolean;
  featured?: boolean;
  image: string;
  description: string;
  _deleted?: boolean;
}

interface Product {
  id: string;
  slug: string;
  collection: string;
  data: ProductData;
}

interface Props {
  initialProduct: Product;
  isNew?: boolean;
}

export default function ProductEditor({ initialProduct, isNew = false }: Props) {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [isDraft, setIsDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Cargar borrador local al montar
  useEffect(() => {
    async function loadDraft() {
      const draft = await getDraft(initialProduct.collection, initialProduct.slug);
      if (draft) {
        setProduct({ ...initialProduct, data: draft.data });
        setIsDraft(true);
      }
    }
    loadDraft();
  }, [initialProduct.slug, initialProduct.collection]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveDraft(product.collection, product.slug, product.data);
    setIsDraft(true);
    setIsSaving(false);
    
    // Redirigir de vuelta a la tabla de productos
    window.location.href = '/admin/products';
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;
    
    setProduct(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: val
      }
    }));
  };

  const handleDiscard = async () => {
    if (confirm('¿Estás seguro de descartar tus cambios locales? Volverás a la versión publicada.')) {
      await deleteDraft(product.collection, product.slug);
      setProduct(initialProduct);
      setIsDraft(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de querer eliminar este producto? (Deberás publicarlo para que se borre definitivamente)')) {
      setIsSaving(true);
      await saveDraft(product.collection, product.slug, { ...product.data, _deleted: true });
      setIsSaving(false);
      window.location.href = '/admin/products';
    }
  };

  const handleIdChange = (e: any) => {
    // Solo permitir letras, numeros y guiones
    const newId = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    setProduct(prev => ({
      ...prev,
      id: newId,
      slug: newId,
      data: {
        ...prev.data,
        id: newId,
        slug: newId
      }
    }));
  };

  // Si el producto está marcado como eliminado, mostramos un aviso
  if (product.data._deleted) {
    return (
      <div style={{ background: '#FEE2E2', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #F87171' }}>
        <h2 style={{ color: '#991B1B', margin: '0 0 1rem 0' }}>Producto marcado para eliminación</h2>
        <p style={{ color: '#7F1D1D', marginBottom: '2rem' }}>Este producto se eliminará de la base de datos la próxima vez que publiques los cambios.</p>
        <button 
          onClick={handleDiscard}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: 'white', fontWeight: 600, cursor: 'pointer' }}
        >
          Deshacer eliminación (Restaurar)
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', alignItems: 'start' }}>
      
      {/* Columna Izquierda: Formulario */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid var(--c-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Editar Producto</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
              {isSaving ? 'Guardando...' : saveMessage}
            </span>
            {isDraft && (
              <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                Borrador
              </span>
            )}
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {isNew && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--c-border)' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Identificador (URL / Slug) <span style={{ color: 'var(--c-danger)' }}>*</span></label>
              <input 
                type="text" 
                name="id" 
                value={product.id} 
                onChange={handleIdChange}
                placeholder="ej: te-verde-frio"
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem', background: '#F8F9FA' }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>Este será el nombre del archivo JSON. Solo minúsculas y guiones.</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Nombre del Producto</label>
              <input 
                type="text" 
                name="name" 
                value={product.data.name} 
                onChange={handleChange}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Precio ($)</label>
              <input 
                type="number" 
                name="price" 
                step="0.01"
                value={product.data.price} 
                onChange={handleChange}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Categoría</label>
              <select 
                name="category" 
                value={product.data.category} 
                onChange={handleChange}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem', background: 'white' }}
              >
                <option value="espresso">Espresso</option>
                <option value="lattes">Lattes</option>
                <option value="frios">Fríos</option>
                <option value="te-infusiones">Té e Infusiones</option>
                <option value="panaderia">Panadería</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                <input 
                  type="checkbox" 
                  name="available" 
                  checked={product.data.available !== false} 
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px' }}
                />
                Disponible
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                <input 
                  type="checkbox" 
                  name="featured" 
                  checked={product.data.featured === true} 
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px' }}
                />
                Destacado (Favorito)
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Descripción</label>
            <textarea 
              name="description" 
              value={product.data.description} 
              onChange={handleChange}
              rows={4}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ruta de Imagen</label>
            <input 
              type="text" 
              name="image" 
              value={product.data.image} 
              onChange={handleChange}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--c-border)', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button" 
                onClick={handleSave}
                disabled={isNew && !product.id}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  background: 'var(--c-primary)',
                  color: 'white',
                  cursor: (isNew && !product.id) ? 'not-allowed' : 'pointer',
                  opacity: (isNew && !product.id) ? 0.7 : 1,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSaving ? 'Guardando...' : (isNew ? 'Crear Borrador' : 'Guardar Borrador')}
              </button>
              <button 
                type="button" 
                disabled={!isDraft && !isNew}
                onClick={handleDiscard}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--c-border)', 
                  background: 'white',
                  color: (isDraft || isNew) ? 'var(--c-text-muted)' : 'var(--c-text-muted)',
                  cursor: (isDraft || isNew) ? 'pointer' : 'not-allowed',
                  fontWeight: 600
                }}
              >
                Descartar cambios
              </button>
            </div>
            
            {!isNew && (
              <button 
                type="button" 
                onClick={handleDelete}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid #F87171', 
                  background: 'transparent',
                  color: '#DC2626',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Eliminar Producto
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Columna Derecha: Preview de Datos (Split View) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Visual Preview */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--c-border)', padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'left' }}>
            Vista Previa (Miniatura)
          </h3>
          <div style={{ background: 'var(--c-bg)', padding: '2rem', borderRadius: '8px', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <img 
              src={product.data.image} 
              alt={product.data.name} 
              style={{ width: '120px', height: '120px', objectFit: 'contain' }}
              onError={(e) => (e.currentTarget.src = '/favicon.svg')}
            />
          </div>
          <h4 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{product.data.name}</h4>
          <div style={{ color: 'var(--c-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
            ${product.data.price.toFixed(2)}
          </div>
        </div>

        {/* JSON Preview */}
        <div style={{ background: '#1E1E1E', color: '#D4D4D4', borderRadius: '12px', border: '1px solid var(--c-border)', overflow: 'hidden' }}>
          <div style={{ background: '#2D2D2D', padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>{product.id}</span>
            <span style={{ color: '#858585' }}>JSON</span>
          </div>
          <pre style={{ padding: '1rem', margin: 0, fontSize: '0.85rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(product.data, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}
