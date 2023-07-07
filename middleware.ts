import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("auth");
  const url = req.nextUrl.pathname;
  const url2 = req.url;

  if (
    url.includes("transferencias") ||
    url.includes("perfil") ||
    url.includes("actividad") ||
    url.includes("agregar-tarjeta") ||
    url.includes("cargar-dinero") ||
    url.includes("depositos") ||
    url.includes("listar-servicios") ||
    url.includes("listar-tarjetas") ||
    url.includes("ingresar-numero-cuenta")
  ) {
    if (!token) {
      return NextResponse.redirect(`${process.env.URL_PAGE}iniciar-sesion/paso-1`);
    }
  }

  if (url2 === `${process.env.URL_PAGE}`) {
    if (token) {
      return NextResponse.redirect(`${process.env.URL_PAGE}inicio`);
    }
  }

  if (
    url.includes("registro-exitoso") ||
    url.includes("iniciar-sesion") ||
    url.includes("recuperar") ||
    url.includes("recupero") ||
    url.includes("registro")
  ) {
    if (token) {
      return NextResponse.redirect(`${process.env.URL_PAGE}inicio`);
    }
  }

  return NextResponse.next();
}