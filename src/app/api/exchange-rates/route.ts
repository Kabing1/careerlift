import { NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/api/currency';

export async function GET() {
  try {
    const rates = await fetchExchangeRates();
    return NextResponse.json({ rates });
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    // Return default rates if there's an error
    return NextResponse.json({
      rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.0,
        AUD: 1.35,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.45,
        INR: 74.5,
        ZAR: 15.0,
      }
    });
  }
}