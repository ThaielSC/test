async function getAllDrafts() {
  if (typeof window === "undefined") return [];
  const {
    keys,
    get
  } = await import('idb-keyval');
  const allKeys = await keys();
  const draftKeys = allKeys.filter((k) => typeof k === "string" && k.startsWith("draft_"));
  const drafts = await Promise.all(draftKeys.map((k) => get(k)));
  return drafts.filter(Boolean);
}
async function deleteDraft(collection, slug) {
  if (typeof window === "undefined") return;
  const {
    del
  } = await import('idb-keyval');
  const key = `draft_${collection}_${slug}`;
  await del(key);
}

export { deleteDraft as d, getAllDrafts as g };
