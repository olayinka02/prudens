"use client";
import React, { Suspense, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/app/utils/api';
import { toast } from 'react-toastify';

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get('reference');
    const hasCalledRef = useRef(false);


    useEffect(() => {
        if (!reference || hasCalledRef.current) return;

        hasCalledRef.current = true;

        const verifyPayment = async () => {
            try {
            const response = await api.get(`/payments/callback?reference=${reference}`);
            if (response.status === 200) {
                router.push(`/payment/success?reference=${reference}`);
            } else {
                router.push(`/payment/failed?reference=${reference}`);
            }
            } catch (err) {
            router.push(`/payment/success?reference=${reference}`);
            }
        };

        verifyPayment();
        }, [reference, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600">Verifying your payment...</p>
        </div>
    );
}

function PaymentStatusPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentStatusContent />
      </Suspense>
    );
  }

export default PaymentStatusPage;
