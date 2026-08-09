import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export' se quitó: /api/chat necesita correr como función server
  // (Vercel Function) para poder esconder la API key de OpenAI. El resto de
  // las páginas se sigue prerenderizando estático igual que antes.
};

export default nextConfig;
