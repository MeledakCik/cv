// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simpan data di memori untuk Rate Limiting
const requestCounts = new Map<string, { count: number, lastRequest: number }>();

// Fungsi Generate ID Mirip Cloudflare (16 digit Hex)
function generateCFStyleID(length: number) {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Abaikan file statis & JANGAN cegat halaman verifikasi (biar gak looping)
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname === '/v2/shield-verify'
  ) {
    return NextResponse.next();
  }

  // 2. Generate Ray ID & Identitas Request
  const rayId = `${generateCFStyleID(16)}-JKT`;
  const fingerprint = request.headers.get('x-browser-fingerprint') || 'guest';
  const now = Date.now();

  // 3. Security Layer: Block User-Agent Bot (Python/Node)
  const userAgent = request.headers.get('user-agent') || '';
  if (userAgent.includes('python-requests') || userAgent.includes('node-fetch')) {
    return new NextResponse(
      JSON.stringify({ error: "Direct API Access Forbidden", ray_id: rayId }),
      { status: 403, headers: { 'Content-Type': 'application/json', 'server': 'cloudflare' } }
    );
  }

  // 4. Advanced Rate Limiting (Maks 100 req/menit)
  const userData = requestCounts.get(fingerprint) || { count: 0, lastRequest: now };
  if (now - userData.lastRequest > 60000) {
    userData.count = 0;
    userData.lastRequest = now;
  }
  userData.count++;
  requestCounts.set(fingerprint, userData);

  if (userData.count > 100) {
    return new NextResponse(null, {
      status: 429,
      headers: { 'cf-ray': rayId, 'server': 'cloudflare' }
    });
  }

  // 5. Cek Cookie Clearance (Sistem Challenge Cikawan)
  const shieldToken = request.cookies.get('__cik_clearance')?.value;

  // --- LOGIKA REDIRECT KE WAITING ROOM ---
  // Jika user belum punya cookie verifikasi, lempar ke halaman challenge
  if (!shieldToken) {
    return NextResponse.redirect(new URL('/v2/shield-verify', request.url));
  }

  // 6. Alur Response (Rewrite untuk API atau Next biasa)
  let response: NextResponse;
  if (pathname.startsWith('/api/secure')) {
    const apiPath = pathname.replace('/api/secure', '');
    const gatewayUrl = process.env.API_GATEWAY_URL || 'http://localhost:8000';
    const targetUrl = new URL(`${gatewayUrl}${apiPath}`);
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('X-Custom-Auth', process.env.PRIVATE_SECRET_KEY || '');
    modifiedHeaders.set('cf-ray', rayId);

    response = NextResponse.rewrite(targetUrl, { request: { headers: modifiedHeaders } });
  } else {
    response = NextResponse.next();
  }

  // proxy.ts (Bagian CSP)
  const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://translate.google.com https://translate.googleapis.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com https://www.gstatic.com;
  img-src 'self' blob: data: https: https://www.gstatic.com https://www.google.com https://translate.google.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://translate.googleapis.com https://translate.google.com;
  frame-src 'self' https://translate.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();
  response.headers.set('X-Frame-Options', 'DENY');

  // C. Anti-MIME Sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // D. HSTS (High Security Transport) - Paksa koneksi HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // E. Header Penyamaran Cloudflare & Tracing
  response.headers.set('server', 'cloudflare');
  response.headers.set('cf-ray', rayId);
  response.headers.set('cf-cache-status', 'DYNAMIC');
  response.headers.set('cf-bycik-status', 'PROTECTED');
  response.headers.set('alt-svc', 'h3=":443"; ma=86400');

  // F. Analytics & Cache Control
  response.headers.set('server-timing', `cfCacheStatus;desc="DYNAMIC", cfEdge;dur=${Math.floor(Math.random() * 50)}`);
  response.headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}