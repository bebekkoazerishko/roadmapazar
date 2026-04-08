import { NextResponse } from 'next/server';
import { createClient } from '@vercel/kv';

const getKvClient = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    return null;
  }
  
  return createClient({ url, token });
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const syncKey = searchParams.get('key');
  
  if (!syncKey) {
    return NextResponse.json({ error: 'Missing sync key' }, { status: 400 });
  }

  const kv = getKvClient();
  if (!kv) {
    return NextResponse.json({ error: 'Upstash Redis not linked in Vercel' }, { status: 501 });
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

    const kv = getKvClient();
    if (!kv) {
      return NextResponse.json({ error: 'Upstash Redis not linked in Vercel' }, { status: 501 });
    }

    await kv.set(`roadmap_sync_${syncKey}`, data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
