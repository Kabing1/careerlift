import React from 'react';
import { useCurrency } from '@/hooks/useCurrency';

interface PriceProps {
  amount: number;
  className?: string;
}

export default function Price({ amount, className }: PriceProps) {
  const { convertPrice } = useCurrency();
  
  if (typeof amount !== 'number') {
    return null;
  }

  return <span className={className}>{convertPrice(amount)}</span>;
}