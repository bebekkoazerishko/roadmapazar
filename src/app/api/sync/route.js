import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const syncKey = searchParams.get('key');
  
  if (!syncKey) {
    return NextResponse.json({ error: 'Missing sync key' }, { status: 400 });
  }

  // Graceful fallback if Vercel KV isn't configured yet
  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ error: 'KV DB not linked in Vercel' }, { status: 501 });
  }

  try {
    const data = await kv.get(`roadmap_sync_${syncKey}`);
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { syncKey, data } = body;

    if (!syncKey) {
      return NextResponse.json({ error: 'Missing sync key' }, { status: 400 });
    }

    if (!process.env.KV_REST_API_URL) {
      return NextResponse.json({ error: 'KV DB not linked in Vercel' }, { status: 501 });
    }

    await kv.set(`roadmap_sync_${syncKey}`, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
