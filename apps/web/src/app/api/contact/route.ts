import { NextResponse } from 'next/server';

/** BFF: el navegador habla con este origen y el servidor con Nest.js. */
export async function POST(request: Request) {
  const apiUrl = process.env.API_INTERNAL_URL ?? 'http://127.0.0.1:3001';

  try {
    const payload = await request.json();
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
      cache: 'no-store',
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
    };

    return NextResponse.json(data, {
      status: response.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo conectar con el servidor de correo.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
