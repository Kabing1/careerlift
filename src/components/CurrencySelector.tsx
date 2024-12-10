import React from 'react';
import { Globe } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { currencies } from '@/lib/api/currency';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  React.useEffect(() => {
    const detectUserCurrency = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.currency && currencies[data.currency]) {
          setCurrency(data.currency);
        }
      } catch {
        setCurrency('USD');
      }
    };

    detectUserCurrency();
  }, [setCurrency]);

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-gray-400" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="appearance-none bg-transparent border-none pr-8 py-1 pl-2 text-sm text-gray-400 hover:text-gray-300 cursor-pointer focus:outline-none focus:ring-0"
        >
          {Object.entries(currencies).map(([code, { name }]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}