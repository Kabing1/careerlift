import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
        </div>
        
        <p className="text-gray-600 mb-4">
          We apologize for the inconvenience. The error has been logged and we'll look into it.
        </p>

        <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 mb-4 overflow-auto">
          {error.message}
        </pre>

        <Button
          variant="primary"
          className="w-full"
          onClick={resetErrorBoundary}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}