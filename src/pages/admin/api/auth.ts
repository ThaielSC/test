export const prerender = false;

import { SignJWT } from 'jose';
import type { APIRoute } from 'astro';

const getSecret = () => {
  try {
    const secret = (typeof process !== 'undefined' && process.env.JWT_SECRET) 
      ? process.env.JWT_SECRET 
      : import.meta.env.JWT_SECRET;
    return new TextEncoder().encode(secret || 'greda-secret-key-for-dev-only');
  } catch (e) {
    return new TextEncoder().encode('greda-secret-key-for-dev-only');
  }
};

// Credenciales fijas para la prueba
const MOCK_USER = {
  email: 'admin@gredacafe.com',
  password: 'greda',
  name: 'Administrador'
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const JWT_SECRET = getSecret();
    const data = await request.json();
    const { email, password } = data;

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      // Crear token JWT
      const token = await new SignJWT({ 
        email: MOCK_USER.email, 
        name: MOCK_USER.name,
        role: 'admin' 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

      // Guardar token en cookie HttpOnly
      cookies.set('greda_auth_token', token, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 horas
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Credenciales inválidas' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
