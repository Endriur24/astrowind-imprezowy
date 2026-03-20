// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

// Cloudflare email module declaration
declare module 'cloudflare:email' {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
    from: string;
    to: string;
    raw: string;
  }
}

// Cloudflare SendEmail binding interface
interface SendEmail {
  send(message: EmailMessage): Promise<void>;
}

// Cloudflare runtime types for Astro
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        TURNSTILE_SECRET_KEY: string;
        SEND_EMAIL: SendEmail;
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
