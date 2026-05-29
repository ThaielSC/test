// No importamos idb-keyval al nivel superior para evitar crashes en SSR de Vercel

export interface Draft {
  collection: string;
  slug: string;
  data: any;
  updatedAt: number;
}

/**
 * Guarda un borrador localmente en el navegador.
 */
export async function saveDraft(collection: string, slug: string, data: any): Promise<void> {
  if (typeof window === 'undefined') return;
  const { set } = await import('idb-keyval');
  const key = `draft_${collection}_${slug}`;
  const draft: Draft = {
    collection,
    slug,
    data,
    updatedAt: Date.now()
  };
  await set(key, draft);
}

/**
 * Recupera un borrador si existe.
 */
export async function getDraft(collection: string, slug: string): Promise<Draft | undefined> {
  if (typeof window === 'undefined') return undefined;
  const { get } = await import('idb-keyval');
  const key = `draft_${collection}_${slug}`;
  return await get(key);
}

/**
 * Obtiene todos los borradores locales (útil para mostrar indicadores en la UI).
 */
export async function getAllDrafts(): Promise<Draft[]> {
  if (typeof window === 'undefined') return [];
  const { keys, get } = await import('idb-keyval');
  const allKeys = await keys();
  const draftKeys = allKeys.filter(k => typeof k === 'string' && k.startsWith('draft_'));
  
  const drafts = await Promise.all(
    draftKeys.map(k => get(k as string))
  );
  
  return drafts.filter(Boolean) as Draft[];
}

/**
 * Elimina un borrador (por ejemplo, después de publicar).
 */
export async function deleteDraft(collection: string, slug: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const { del } = await import('idb-keyval');
  const key = `draft_${collection}_${slug}`;
  await del(key);
}
