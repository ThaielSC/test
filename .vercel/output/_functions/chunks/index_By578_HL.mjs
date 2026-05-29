import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { ba as renderTemplate, aW as maybeRenderHead } from './params-and-props_BoTtfwYV.mjs';
import { r as renderComponent } from './entrypoint_DjevKima.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bp9RbG7t.mjs';
import { g as getCollection } from './_astro_content_Cz87vqqC.mjs';
import 'preact';
import { useState, useEffect } from 'preact/hooks';
import { g as getAllDrafts } from './store_D4QfNgSI.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';

function DashboardStats({
  productsCount,
  pagesCount
}) {
  const [draftsCount, setDraftsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkDrafts() {
      const drafts = await getAllDrafts();
      const validDrafts = drafts.filter((d) => d.slug && d.slug !== "undefined");
      setDraftsCount(validDrafts.length);
      setIsLoading(false);
    }
    checkDrafts();
  }, []);
  return jsxs("div", {
    class: "stats-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.5rem"
    },
    children: [jsxs("div", {
      class: "stat-card",
      style: {
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      },
      children: [jsx("div", {
        class: "stat-icon",
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(212, 146, 42, 0.1)",
          color: "var(--c-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem"
        },
        children: "☕"
      }), jsxs("div", {
        class: "stat-info",
        children: [jsx("h3", {
          style: {
            fontSize: "0.85rem",
            color: "var(--c-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0
          },
          children: "Productos"
        }), jsx("div", {
          class: "stat-value",
          style: {
            fontSize: "1.8rem",
            fontWeight: 700,
            lineHeight: 1.2
          },
          children: productsCount
        })]
      })]
    }), jsxs("div", {
      class: "stat-card",
      style: {
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      },
      children: [jsx("div", {
        class: "stat-icon",
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(212, 146, 42, 0.1)",
          color: "var(--c-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem"
        },
        children: "📄"
      }), jsxs("div", {
        class: "stat-info",
        children: [jsx("h3", {
          style: {
            fontSize: "0.85rem",
            color: "var(--c-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0
          },
          children: "Páginas"
        }), jsx("div", {
          class: "stat-value",
          style: {
            fontSize: "1.8rem",
            fontWeight: 700,
            lineHeight: 1.2
          },
          children: pagesCount
        })]
      })]
    }), jsxs("div", {
      class: "stat-card",
      style: {
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        borderRadius: "12px",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      },
      children: [jsx("div", {
        class: "stat-icon",
        style: {
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(212, 146, 42, 0.1)",
          color: "var(--c-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem"
        },
        children: "🔄"
      }), jsxs("div", {
        class: "stat-info",
        children: [jsx("h3", {
          style: {
            fontSize: "0.85rem",
            color: "var(--c-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: 0
          },
          children: "Estado"
        }), isLoading ? jsx("div", {
          style: {
            color: "var(--c-text-muted)",
            fontSize: "1rem",
            marginTop: "5px"
          },
          children: "Comprobando..."
        }) : draftsCount === 0 ? jsx("div", {
          class: "stat-value",
          style: {
            color: "var(--c-success)",
            fontSize: "1.2rem",
            marginTop: "5px",
            fontWeight: 600
          },
          children: "Al día"
        }) : jsxs("div", {
          class: "stat-value",
          style: {
            color: "var(--c-danger)",
            fontSize: "1.2rem",
            marginTop: "5px",
            fontWeight: 600
          },
          children: [draftsCount, " pdte", draftsCount > 1 ? "s" : "", "."]
        })]
      })]
    })]
  });
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  const products = await getCollection("products");
  const pages = await getCollection("pages");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard-header" style="margin-bottom: 2rem;" data-astro-cid-u2h3djql> <h1 data-astro-cid-u2h3djql>Hola, ${user?.name || "Admin"}</h1> <p data-astro-cid-u2h3djql>Bienvenido a Greda CMS. Aquí podrás gestionar todo el contenido de tu cafetería sin tocar una sola línea de código. Todos los cambios que hagas se guardarán como borradores hasta que decidas publicarlos.</p> </div> ${renderComponent($$result2, "DashboardStats", DashboardStats, { "client:load": true, "productsCount": products.length, "pagesCount": pages.length, "client:component-hydration": "load", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/DashboardStats", "client:component-export": "default", "data-astro-cid-u2h3djql": true })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/index.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
