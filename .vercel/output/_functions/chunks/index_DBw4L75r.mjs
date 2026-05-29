import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { ba as renderTemplate } from './params-and-props_BoTtfwYV.mjs';
import { r as renderComponent } from './entrypoint_DjevKima.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bp9RbG7t.mjs';
import { g as getCollection } from './_astro_content_Cz87vqqC.mjs';
import 'preact';
import { useState, useEffect } from 'preact/hooks';
import { g as getAllDrafts } from './store_D4QfNgSI.mjs';
import { jsxs, jsx } from 'preact/jsx-runtime';

function PageList({
  initialPages
}) {
  const [drafts, setDrafts] = useState([]);
  const [displayPages, setDisplayPages] = useState(initialPages);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadDrafts() {
      const localDrafts = await getAllDrafts();
      const pageDrafts = localDrafts.filter((d) => d.collection === "pages");
      setDrafts(pageDrafts);
      const mergedPages = initialPages.map((p) => {
        const draft = pageDrafts.find((d) => d.slug === p.slug);
        if (draft) {
          return {
            ...p,
            data: draft.data
          };
        }
        return p;
      });
      setDisplayPages(mergedPages);
      setIsLoading(false);
    }
    loadDrafts();
  }, [initialPages]);
  const hasDraft = (slug) => drafts.some((d) => d.slug === slug);
  return jsxs("div", {
    class: "product-list-container",
    children: [jsx("div", {
      class: "header-actions",
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem"
      },
      children: jsx("h2", {
        children: "Tus Páginas"
      })
    }), jsx("div", {
      class: "table-container",
      style: {
        background: "white",
        borderRadius: "12px",
        border: "1px solid var(--c-border)",
        overflow: "hidden"
      },
      children: jsxs("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left"
        },
        children: [jsx("thead", {
          children: jsxs("tr", {
            style: {
              background: "var(--c-bg)",
              borderBottom: "1px solid var(--c-border)"
            },
            children: [jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase"
              },
              children: "Página"
            }), jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase"
              },
              children: "Secciones"
            }), jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                textAlign: "right"
              },
              children: "Acciones"
            })]
          })
        }), jsx("tbody", {
          children: displayPages.map((page) => {
            const isDraft = hasDraft(page.slug);
            return jsxs("tr", {
              style: {
                borderBottom: "1px solid var(--c-border)",
                background: isDraft ? "rgba(212, 146, 42, 0.05)" : "transparent",
                transition: "background 0.3s"
              },
              children: [jsx("td", {
                style: {
                  padding: "1rem"
                },
                children: jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  },
                  children: [jsx("strong", {
                    children: page.data.title
                  }), jsxs("span", {
                    style: {
                      color: "var(--c-text-muted)",
                      fontSize: "0.85rem"
                    },
                    children: ["/", page.slug === "home" ? "" : page.slug]
                  }), isDraft && jsx("span", {
                    style: {
                      background: "var(--c-accent)",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    },
                    children: "Modificado"
                  })]
                })
              }), jsxs("td", {
                style: {
                  padding: "1rem",
                  color: "var(--c-text-muted)",
                  fontSize: "0.9rem"
                },
                children: [page.data.sections?.length || 0, " bloques de contenido"]
              }), jsx("td", {
                style: {
                  padding: "1rem",
                  textAlign: "right"
                },
                children: jsx("a", {
                  href: `/admin/pages/${page.slug}`,
                  style: {
                    color: "var(--c-primary)",
                    textDecoration: "none",
                    fontWeight: 500,
                    border: "1px solid var(--c-border)",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    transition: "all 0.2s"
                  },
                  onMouseOver: (e) => e.currentTarget.style.background = "var(--c-bg)",
                  onMouseOut: (e) => e.currentTarget.style.background = "transparent",
                  children: "Editar Contenido"
                })
              })]
            }, page.slug);
          })
        })]
      })
    })]
  });
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const pages = await getCollection("pages");
  const initialPages = pages.map((p) => ({
    id: p.id,
    slug: p.data.slug || p.id,
    collection: p.collection,
    data: p.data
  }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Páginas" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageList", PageList, { "client:load": true, "initialPages": initialPages, "client:component-hydration": "load", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/PageList", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/pages/index.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/pages/index.astro";
const $$url = "/admin/pages";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
