import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { handleWebhook } from '@/lib/api/payments';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  try {
    await handleWebhook(body, signature);
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}