// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

// Cloudflare runtime types for Astro
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        TURNSTILE_SECRET_KEY: string;
      };
    };
  }
}

// Cloudflare Turnstile global
interface Turnstile {
  reset: () => void;
  render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
  getResponse: (widgetId: string) => string | undefined;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
