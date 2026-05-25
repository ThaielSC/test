import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { getAllDrafts } from '../../lib/store';

interface Props {
  productsCount: number;
  pagesCount: number;
}

export default function DashboardStats({ productsCount, pagesCount }: Props) {
  const [draftsCount, setDraftsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkDrafts() {
      const drafts = await getAllDrafts();
      // Filtrar borradores con slug válido por si quedaron guardados incorrectamente antes
      const validDrafts = drafts.filter(d => d.slug && d.slug !== 'undefined');
      setDraftsCount(validDrafts.length);
      setIsLoading(false);
    }
    checkDrafts();
  }, []);

  return (
    <div class="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
      <div class="stat-card" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div class="stat-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 146, 42, 0.1)', color: 'var(--c-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>☕</div>
        <div class="stat-info">
          <h3 style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Productos</h3>
          <div class="stat-value" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.2 }}>{productsCount}</div>
        </div>
      </div>
      
      <div class="stat-card" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div class="stat-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 146, 42, 0.1)', color: 'var(--c-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📄</div>
        <div class="stat-info">
          <h3 style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Páginas</h3>
          <div class="stat-value" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.2 }}>{pagesCount}</div>
        </div>
      </div>
      
      <div class="stat-card" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div class="stat-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 146, 42, 0.1)', color: 'var(--c-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🔄</div>
        <div class="stat-info">
          <h3 style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Estado</h3>
          {isLoading ? (
            <div style={{ color: 'var(--c-text-muted)', fontSize: '1rem', marginTop: '5px' }}>Comprobando...</div>
          ) : draftsCount === 0 ? (
            <div class="stat-value" style={{ color: 'var(--c-success)', fontSize: '1.2rem', marginTop: '5px', fontWeight: 600 }}>Al día</div>
          ) : (
            <div class="stat-value" style={{ color: 'var(--c-danger)', fontSize: '1.2rem', marginTop: '5px', fontWeight: 600 }}>
              {draftsCount} pdte{draftsCount > 1 ? 's' : ''}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
