import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { ba as renderTemplate } from './params-and-props_BoTtfwYV.mjs';
import { r as renderComponent } from './entrypoint_DjevKima.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bp9RbG7t.mjs';
import 'preact';
import { useState, useEffect } from 'preact/hooks';
import { g as getAllDrafts, d as deleteDraft } from './store_D4QfNgSI.mjs';
import { jsx, jsxs } from 'preact/jsx-runtime';

function CheckpointManager() {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    async function load() {
      const localDrafts = await getAllDrafts();
      setDrafts(localDrafts);
      setIsLoading(false);
    }
    load();
  }, []);
  const handlePublish = async () => {
    if (drafts.length === 0) return;
    setIsPublishing(true);
    setMessage(null);
    try {
      const res = await fetch("/admin/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          drafts
        })
      });
      const result = await res.json();
      if (result.success) {
        await Promise.all(drafts.map((d) => deleteDraft(d.collection, d.slug)));
        setDrafts([]);
        setMessage({
          type: "success",
          text: "¡Cambios publicados exitosamente!"
        });
        setTimeout(() => window.location.reload(), 2e3);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Error al publicar"
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Error de conexión con el servidor"
      });
    } finally {
      setIsPublishing(false);
    }
  };
  const handleDiscardAll = async () => {
    if (confirm("¿Estás totalmente seguro? Perderás todos tus cambios locales no publicados.")) {
      await Promise.all(drafts.map((d) => deleteDraft(d.collection, d.slug)));
      setDrafts([]);
    }
  };
  if (isLoading) return jsx("div", {
    style: {
      padding: "2rem"
    },
    children: "Cargando estado..."
  });
  return jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto"
    },
    children: [message && jsx("div", {
      style: {
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "2rem",
        background: message.type === "success" ? "#D1FAE5" : "#FEE2E2",
        color: message.type === "success" ? "#065F46" : "#991B1B",
        fontWeight: 500,
        border: `1px solid ${message.type === "success" ? "#34D399" : "#F87171"}`
      },
      children: message.text
    }), jsxs("div", {
      style: {
        background: "white",
        borderRadius: "12px",
        border: "1px solid var(--c-border)",
        overflow: "hidden"
      },
      children: [jsx("div", {
        style: {
          padding: "2rem",
          borderBottom: "1px solid var(--c-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: jsxs("div", {
          children: [jsx("h2", {
            style: {
              fontSize: "1.4rem",
              margin: "0 0 0.5rem 0"
            },
            children: "Cambios Pendientes"
          }), jsx("p", {
            style: {
              color: "var(--c-text-muted)",
              margin: 0
            },
            children: drafts.length === 0 ? "Todo está al día. No hay borradores locales sin publicar." : `Tienes ${drafts.length} cambios locales esperando para salir en vivo.`
          })]
        })
      }), drafts.length > 0 && jsxs("div", {
        style: {
          padding: "2rem"
        },
        children: [jsx("ul", {
          style: {
            listStyle: "none",
            padding: 0,
            margin: "0 0 2rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          },
          children: drafts.map((draft) => jsxs("li", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              background: "var(--c-bg)",
              borderRadius: "8px",
              border: "1px solid var(--c-border)"
            },
            children: [jsxs("div", {
              children: [jsx("span", {
                style: {
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--c-accent)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.25rem"
                },
                children: draft.collection
              }), jsx("strong", {
                style: {
                  fontSize: "1.1rem"
                },
                children: draft.data.name || draft.slug
              })]
            }), jsxs("span", {
              style: {
                fontSize: "0.85rem",
                color: "var(--c-text-muted)"
              },
              children: ["Editado hace ", Math.round((Date.now() - draft.updatedAt) / 6e4), " min"]
            })]
          }, `${draft.collection}-${draft.slug}`))
        }), jsxs("div", {
          style: {
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end"
          },
          children: [jsx("button", {
            onClick: handleDiscardAll,
            disabled: isPublishing,
            style: {
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              border: "1px solid var(--c-border)",
              background: "transparent",
              color: "var(--c-text-muted)",
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "Descartar Todo"
          }), jsx("button", {
            onClick: handlePublish,
            disabled: isPublishing,
            style: {
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              border: "none",
              background: "var(--c-primary)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            },
            children: isPublishing ? "Sincronizando..." : "Publicar Ahora (Crear Checkpoint)"
          })]
        })]
      })]
    }), jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1.5rem",
        background: "rgba(212, 146, 42, 0.05)",
        borderRadius: "12px",
        border: "1px solid rgba(212, 146, 42, 0.2)"
      },
      children: [jsx("h3", {
        style: {
          fontSize: "1rem",
          color: "var(--c-accent)",
          marginBottom: "0.5rem"
        },
        children: "¿Cómo funciona?"
      }), jsxs("p", {
        style: {
          fontSize: "0.9rem",
          color: "var(--c-text-muted)",
          lineHeight: 1.6,
          margin: 0
        },
        children: ["Al publicar, Greda CMS detectará tu entorno. Si estás desarrollando en tu máquina local, actualizará los archivos JSON directamente. Si estás en producción (como Vercel o Cloudflare), utilizará la API de Github para crear un nuevo ", jsx("em", {
          children: "commit"
        }), " en la rama ", jsx("code", {
          children: "drafts"
        }), ", generando un registro permanente de todos los cambios de esta versión."]
      })]
    })]
  });
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Centro de Versiones (Checkpoints)" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CheckpointManager", CheckpointManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/thaiel/WorkSpace/WEBS/cafe/src/components/admin/CheckpointManager", "client:component-export": "default" })} ` })}`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/checkpoints/index.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/checkpoints/index.astro";
const $$url = "/admin/checkpoints";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
