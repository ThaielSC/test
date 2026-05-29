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

function ProductList({
  initialProducts
}) {
  const [drafts, setDrafts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadDrafts() {
      const localDrafts = await getAllDrafts();
      const productDrafts = localDrafts.filter((d) => d.collection === "products");
      setDrafts(productDrafts);
      const mergedProducts = initialProducts.map((p) => {
        const draft = productDrafts.find((d) => d.slug === p.slug);
        if (draft) {
          return {
            ...p,
            data: draft.data,
            _isNewDraft: false
          };
        }
        return {
          ...p,
          _isNewDraft: false
        };
      });
      const newDrafts = productDrafts.filter((d) => !initialProducts.some((p) => p.slug === d.slug));
      newDrafts.forEach((d) => {
        mergedProducts.push({
          id: d.slug,
          slug: d.slug,
          collection: d.collection,
          body: "",
          data: d.data,
          _isNewDraft: true
        });
      });
      setDisplayProducts(mergedProducts);
      setIsLoading(false);
    }
    loadDrafts();
  }, [initialProducts]);
  const hasDraft = (slug) => drafts.some((d) => d.slug === slug);
  return jsxs("div", {
    class: "product-list-container",
    children: [jsxs("div", {
      class: "header-actions",
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem"
      },
      children: [jsx("h2", {
        children: "Tus Productos"
      }), jsx("a", {
        href: "/admin/products/new",
        class: "btn btn-primary",
        style: {
          background: "var(--c-primary)",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          fontWeight: 600
        },
        children: "+ Nuevo Producto"
      })]
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
              children: "Producto"
            }), jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase"
              },
              children: "Categoría"
            }), jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase"
              },
              children: "Precio"
            }), jsx("th", {
              style: {
                padding: "1rem",
                fontWeight: 600,
                color: "var(--c-text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase"
              },
              children: "Estado"
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
          children: displayProducts.map((product) => {
            const isDraft = hasDraft(product.slug);
            const isDeleted = product.data._deleted === true;
            const isNewDraft = product._isNewDraft === true;
            return jsxs("tr", {
              style: {
                borderBottom: "1px solid var(--c-border)",
                background: isDeleted ? "#FEE2E2" : isDraft ? "rgba(212, 146, 42, 0.05)" : "transparent",
                transition: "background 0.3s",
                opacity: isDeleted ? 0.7 : 1
              },
              children: [jsx("td", {
                style: {
                  padding: "1rem"
                },
                children: jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem"
                  },
                  children: [jsx("div", {
                    style: {
                      width: "40px",
                      height: "40px",
                      background: "var(--c-bg)",
                      borderRadius: "8px",
                      padding: "5px"
                    },
                    children: jsx("img", {
                      src: product.data.image,
                      alt: product.data.name,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                      }
                    })
                  }), jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    },
                    children: [jsx("strong", {
                      style: {
                        textDecoration: isDeleted ? "line-through" : "none"
                      },
                      children: product.data.name || product.slug
                    }), isDeleted && jsx("span", {
                      style: {
                        background: "#DC2626",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: "A Eliminar"
                    }), !isDeleted && isNewDraft && jsx("span", {
                      style: {
                        background: "#10B981",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: "Nuevo"
                    }), !isDeleted && !isNewDraft && isDraft && jsx("span", {
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
                  })]
                })
              }), jsx("td", {
                style: {
                  padding: "1rem"
                },
                children: jsx("span", {
                  style: {
                    background: "var(--c-bg)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 500
                  },
                  children: product.data.category
                })
              }), jsxs("td", {
                style: {
                  padding: "1rem"
                },
                children: ["$", product.data.price.toFixed(2)]
              }), jsx("td", {
                style: {
                  padding: "1rem"
                },
                children: isDraft ? jsxs("span", {
                  style: {
                    color: "#D97706",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  children: [jsx("span", {
                    style: {
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      background: "#D97706",
                      borderRadius: "50%"
                    }
                  }), "Borrador local"]
                }) : jsxs("span", {
                  style: {
                    color: "#059669",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  children: [jsx("span", {
                    style: {
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      background: "#059669",
                      borderRadius: "50%"
                    }
                  }), "Publicado"]
                })
              }), jsx("td", {
                style: {
                  padding: "1rem",
                  textAlign: "right"
                },
                children: jsx("a", {
                  href: `/admin/products/${product.slug}`,
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
                  children: "Editar"
                })
              })]
            }, product.slug);
          })
        })]
      })
    })]
  });
}

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  Astro2.locals.user;
  const products = await getCollection("products");
  const initialProducts = products.map((p) => ({
    id: p.id,
    slug: p.data.slug || p.id,
    body: p.body,
    collection: p.collection,
    data: p.data
  }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos" }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "ProductList", ProductList, { "client:load": true, "initialProducts": initialProducts, "client:component-hydration": "load", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/ProductList", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/index.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/products/index.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
