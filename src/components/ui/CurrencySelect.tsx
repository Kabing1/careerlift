import React from 'react';
import { Globe } from 'lucide-react';
import { Currency, useCurrencyStore } from '@/lib/currency';

export default function CurrencySelect() {
  const { currency, setCurrency } = useCurrencyStore();

  const currencies: Record<Currency, string> = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
    AUD: 'Australian Dollar',
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-gray-400" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="appearance-none bg-transparent border-none pr-8 py-1 pl-2 text-sm text-gray-400 hover:text-gray-300 cursor-pointer focus:outline-none focus:ring-0"
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}