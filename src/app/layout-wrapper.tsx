'use client';

import React, { useEffect } from 'react';
import { CLARITY_PROJECT_ID } from './config/analytics';

type LayoutWrapperProps = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // Initialize Clarity on the client side
  useEffect(() => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      
      // Add Clarity initialization code
      script.onload = () => {
        // @ts-expect-error - Clarity is added to the window by the script
        if (window.clarity) {
          // @ts-expect-error - Clarity is added to the window by the script
          window.clarity("identify", "user");
        }
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return <>{children}</>;
} 