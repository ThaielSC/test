import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { b6 as renderHead, a6 as addAttribute, ba as renderTemplate, b7 as renderSlot } from './params-and-props_BoTtfwYV.mjs';
import 'clsx';
import { r as renderScript } from './script_D5a4SrNP.mjs';

const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const user = Astro2.locals.user;
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Productos", icon: "☕", path: "/admin/products" },
    { label: "Páginas", icon: "📄", path: "/admin/pages" },
    { label: "Versiones (Git)", icon: "🔄", path: "/admin/checkpoints" }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} — Greda CMS</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> <aside class="sidebar"> <div class="brand"> <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="18" cy="20" r="14" fill="#2A1810" stroke="#D4922A" stroke-width="2"></circle> <ellipse cx="18" cy="14" rx="10" ry="4" fill="#6B3A2A"></ellipse> </svg>
Greda<span class="brand-accent">CMS</span> </div> <nav class="nav"> ${navItems.map((item) => {
    const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/") && item.path !== "/admin";
    return renderTemplate`<a${addAttribute(item.path, "href")}${addAttribute(["nav-link", { active: isActive }], "class:list")}> <span>${item.icon}</span> ${item.label} </a>`;
  })} </nav> <div class="user-panel"> <div class="user-info"> <span class="user-name">${user?.name || "Admin"}</span> <span class="user-email">${user?.email}</span> </div> <button class="logout-btn" id="logout-btn" title="Cerrar sesión"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg> </button> </div> </aside> <main class="main"> <header class="header"> <div class="header-title"> ${renderSlot($$result, $$slots["header-title"], renderTemplate`${title}`)} </div> <div class="header-actions"> ${renderSlot($$result, $$slots["header-actions"], renderTemplate` <a href="/" target="_blank" class="nav-link" style="padding: 0.4rem 1rem; border: 1px solid var(--c-border); font-size: 0.9rem; color: var(--c-text);">
Ver sitio en vivo ↗
</a> `)} </div> </header> <div class="content"> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderScript($$result, "/home/thaiel/WorkSpace/WEBS/cafe/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
