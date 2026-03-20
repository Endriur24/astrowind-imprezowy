import type { APIRoute } from 'astro';

// IMPORTANT: Disable prerendering to ensure this endpoint is always rendered on-demand
export const prerender = false;

export const GET: APIRoute = async ({ request, locals, redirect }) => {
  

  //example response
  const responseData = {
    message: 'Hello from the API route!',
    timestamp: new Date().toISOString(),
  };

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Cloudflare-CDN-Cache-Control': 'no-store',
    'Vary': '*',
  });

  return new Response(JSON.stringify(responseData), {
    headers: headers,
  });
};