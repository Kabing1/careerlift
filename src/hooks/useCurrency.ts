import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { currencies } from '@/lib/api/currency';

interface CurrencyState {
  currency: string;
  rates: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  setCurrency: (currency: string) => void;
  setRates: (rates: Record<string, number>) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  convertPrice: (amount: number) => string;
}

const DEFAULT_RATES = {
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
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      rates: DEFAULT_RATES,
      isLoading: false,
      error: null,
      setCurrency: (currency) => {
        if (currencies[currency]) {
          set({ currency });
        }
      },
      setRates: (rates) => set({ rates }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading }),
      convertPrice: (amount) => {
        if (!amount || typeof amount !== 'number') {
          return `${currencies['USD'].symbol}0.00`;
        }

        const { currency, rates } = get();
        const rate = rates[currency] || 1;
        const converted = amount * rate;
        
        try {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(converted);
        } catch {
          return `${currencies[currency]?.symbol || '$'}${converted.toFixed(2)}`;
        }
      },
    }),
    {
      name: 'currency-store',
      version: 1,
      partialize: (state) => ({
        currency: state.currency,
        rates: state.rates,
      }),
    }
  )
);