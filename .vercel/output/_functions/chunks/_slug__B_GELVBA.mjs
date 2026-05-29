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
    return Astro2.redirect("/admin/products");
  }
  const product = await getEntry("products", slug);
  if (!product) {
    return Astro2.redirect("/admin/products");
  }
  const initialProduct = {
    id: product.id,
    slug: product.id,
    collection: product.collection,
    data: product.data
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Editando: ${product.data.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/admin/products" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--c-text-muted); font-weight: 500; margin-bottom: 1.5rem;">
← Volver a productos
</a> ${renderComponent($$result2, "ProductEditor", null, { "client:only": "preact", "initialProduct": initialProduct, "client:component-hydration": "only", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/ProductEditor", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/[slug].astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/[slug].astro";
const $$url = "/admin/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
