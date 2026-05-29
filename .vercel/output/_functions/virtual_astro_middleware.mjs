import { ap as defineMiddleware, bf as sequence } from './chunks/params-and-props_BoTtfwYV.mjs';
import 'piccolore';
import 'clsx';
import { jwtVerify } from 'jose';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const getSecret = () => {
    try {
      const secret = typeof process !== "undefined" && process.env.JWT_SECRET ? process.env.JWT_SECRET : undefined                          ;
      return new TextEncoder().encode(secret || "greda-secret-key-for-dev-only");
    } catch (e) {
      return new TextEncoder().encode("greda-secret-key-for-dev-only");
    }
  };
  const JWT_SECRET = getSecret();
  const {
    url,
    cookies,
    redirect
  } = context;
  if (url.pathname.startsWith("/admin")) {
    if (url.pathname === "/admin/login" || url.pathname === "/admin/api/auth") {
      return next();
    }
    const token = cookies.get("greda_auth_token")?.value;
    if (!token) {
      return redirect("/admin/login");
    }
    try {
      const {
        payload
      } = await jwtVerify(token, JWT_SECRET);
      context.locals.user = payload;
    } catch (error) {
      cookies.delete("greda_auth_token", {
        path: "/"
      });
      return redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
