import React from 'react';
import { Currency, formatCurrency, useCurrencyStore } from '@/lib/currency';

interface PriceProps {
  amount: number;
  className?: string;
}

export default function Price({ amount, className }: PriceProps) {
  const { currency } = useCurrencyStore();
  
  return (
    <span className={className}>
      {formatCurrency(amount, currency)}
    </span>
  );
}