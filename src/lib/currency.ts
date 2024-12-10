import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD';

interface CurrencyState {
  currency: Currency;
  rates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  setRates: (rates: Record<Currency, number>) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: 'USD',
      rates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
        AUD: 1.35,
      },
      setCurrency: (currency) => set({ currency }),
      setRates: (rates) => set({ rates }),
    }),
    {
      name: 'currency-store',
    }
  )
);

export async function fetchExchangeRates() {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
}

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  const { rates } = useCurrencyStore.getState();
  const convertedAmount = amount * (rates[currency] || 1);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(convertedAmount);
}