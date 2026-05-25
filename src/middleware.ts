import { defineMiddleware } from 'astro:middleware';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(import.meta.env.JWT_SECRET || 'greda-secret-key-for-dev-only');

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Solo proteger rutas que empiezan con /admin (excepto /admin/login y la API de auth)
  if (url.pathname.startsWith('/admin')) {
    if (url.pathname === '/admin/login' || url.pathname === '/admin/api/auth') {
      return next();
    }

    const token = cookies.get('greda_auth_token')?.value;

    if (!token) {
      return redirect('/admin/login');
    }

    try {
      // Verificar token
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Pasar datos del usuario al contexto
      context.locals.user = payload;
    } catch (error) {
      // Token inválido o expirado
      cookies.delete('greda_auth_token', { path: '/' });
      return redirect('/admin/login');
    }
  }

  return next();
});
