import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { ba as renderTemplate, aW as maybeRenderHead } from './params-and-props_BoTtfwYV.mjs';
import { r as renderComponent } from './entrypoint_DjevKima.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bp9RbG7t.mjs';
import { a as getEntry } from './_astro_content_Cz87vqqC.mjs';

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/admin/pages");
  }
  const page = await getEntry("pages", slug);
  if (!page) {
    return Astro2.redirect("/admin/pages");
  }
  const initialPage = {
    id: page.id,
    slug: page.id,
    collection: page.collection,
    data: page.data
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Editando Página: ${page.data.title}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/admin/pages" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--c-text-muted); font-weight: 500; margin-bottom: 1.5rem;">
← Volver a Páginas
</a> ${renderComponent($$result2, "PageEditor", null, { "client:only": "preact", "initialPage": initialPage, "client:component-hydration": "only", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/PageEditor", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/pages/[slug].astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/pages/[slug].astro";
const $$url = "/admin/pages/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
