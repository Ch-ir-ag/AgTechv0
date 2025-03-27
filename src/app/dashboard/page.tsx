'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Lakeland Dairies dashboard
    router.replace('/lakeland-dairies/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f7ff]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Redirecting...</h2>
        <p className="mt-2 text-gray-500">Taking you to the Lakeland Dairies dashboard</p>
      </div>
    </div>
  );
} 