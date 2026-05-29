import { c as createComponent } from './astro-component_CVEocA-K.mjs';
import 'piccolore';
import { b6 as renderHead, ba as renderTemplate } from './params-and-props_BoTtfwYV.mjs';
import 'clsx';
import { r as renderScript } from './script_D5a4SrNP.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.locals.user) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login — Greda CMS</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-container" data-astro-cid-rf56lckb> <div class="logo-container" data-astro-cid-rf56lckb> <svg class="logo-icon" width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rf56lckb> <circle cx="18" cy="20" r="14" fill="#2A1810" stroke="#D4922A" stroke-width="2" data-astro-cid-rf56lckb></circle> <ellipse cx="18" cy="14" rx="10" ry="4" fill="#6B3A2A" data-astro-cid-rf56lckb></ellipse> <path d="M28 18 C32 16 34 20 30 22" stroke="#2A1810" stroke-width="2.5" stroke-linecap="round" fill="none" data-astro-cid-rf56lckb></path> </svg> <h1 data-astro-cid-rf56lckb>Greda CMS</h1> <p class="subtitle" data-astro-cid-rf56lckb>Panel de Administración</p> </div> <div class="login-card" data-astro-cid-rf56lckb> <form id="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Correo Electrónico</label> <input type="email" id="email" name="email" required autocomplete="email" placeholder="tu@correo.com" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contraseña</label> <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn" id="submit-btn" data-astro-cid-rf56lckb> <span class="btn-text" data-astro-cid-rf56lckb>Ingresar</span> <span class="loader" data-astro-cid-rf56lckb></span> </button> <div class="error-msg" id="error-msg" data-astro-cid-rf56lckb></div> </form> </div> <div class="demo-hint" data-astro-cid-rf56lckb> <strong data-astro-cid-rf56lckb>Demo:</strong> Usa <code data-astro-cid-rf56lckb>admin@gredacafe.com</code> / <code data-astro-cid-rf56lckb>greda</code> </div> </div> ${renderScript($$result, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/login.astro", void 0);

const $$file = "/home/thaiel/WorkSpace/WEBS/cafe/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
