import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const response = NextResponse.next();

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: response.headers });
  }

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*', // Matches all routes
};
