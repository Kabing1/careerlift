import React from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PricingButtonProps {
  planId: string;
  children: React.ReactNode;
  className?: string;
}

export default function PricingButton({ planId, children, className }: PricingButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      toast.error('Failed to start checkout process');
      console.error('Checkout error:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}