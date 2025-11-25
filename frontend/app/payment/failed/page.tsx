"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    console.log("Payment Failed Page loaded. Reference:", reference);
  }, [reference]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-700 mb-4">
          We're sorry, but your payment was not successful. Please try again or use a different payment method.
        </p>
        {reference && (
          <p className="text-sm text-gray-500 mb-4">
            Transaction Reference: <strong>{reference}</strong>
          </p>
        )}
        <div className="flex justify-center space-x-4 mt-6">
          <a href="/subscription" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Try Again
          </a>
          <a href="/" className="inline-block bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

function PaymentFailedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}

export default PaymentFailedPage;