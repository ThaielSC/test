import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { ba as renderTemplate, aW as maybeRenderHead } from './params-and-props_BoTtfwYV.mjs';
import { r as renderComponent } from './entrypoint_DjevKima.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bp9RbG7t.mjs';

const prerender = false;
const $$New = createComponent(($$result, $$props, $$slots) => {
  const emptyProduct = {
    id: "",
    slug: "",
    collection: "products",
    data: {
      id: "",
      slug: "",
      name: "",
      price: 0,
      category: "espresso",
      available: true,
      featured: false,
      image: "/assets/products/placeholder.webp",
      description: ""
    }
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Crear Nuevo Producto" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/admin/products" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--c-text-muted); font-weight: 500; margin-bottom: 1.5rem;">
← Volver a productos
</a> ${renderComponent($$result2, "ProductEditor", null, { "client:only": "preact", "initialProduct": emptyProduct, "isNew": true, "client:component-hydration": "only", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/ProductEditor", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/new.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
