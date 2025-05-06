# Microsoft Clarity Integration

This project includes Microsoft Clarity for user behavior analytics.

## Implementation Method

Microsoft Clarity has been integrated using two methods:

1. **Client-Side Script (Primary Method)**: The script is dynamically injected using a client component wrapper in the layout hierarchy
2. **NPM Package (Secondary Method)**: The @microsoft/clarity package is available for programmatic interaction using custom hooks

## Technical Implementation

The implementation uses a hybrid approach to ensure compatibility with Next.js app router:

1. A client wrapper component (`src/app/layout-wrapper.tsx`) that initializes Clarity on the client side
2. Exporting metadata from a separate file (`src/app/metadata.tsx`) to comply with Next.js server component requirements
3. Using the pattern to re-export metadata from the main layout file

## Configuration

The Clarity project ID is stored in `src/app/config/analytics.ts`:

```typescript
export const CLARITY_PROJECT_ID = "rfk8ck3fva";
```

## Features Implemented

- **Auto-initialization**: Clarity is automatically initialized when the app loads via the client wrapper
- **User identification**: Users are identified with Clarity when they log in 
- **Event tracking**: Various user interactions are tracked as events
- **Custom tags**: User data like company is tracked as tags
- **Custom hooks**: A `useAnalytics` hook is available for tracking across components

## Usage Examples

### Track Page Views

```typescript
import { useAnalytics } from '@/app/hooks/useAnalytics';
import { useEffect } from 'react';

export default function SomePage() {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    trackPageView('product_page', 'product-123');
  }, [trackPageView]);
  
  // Rest of component
}
```

### Track User Actions

```typescript
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function ProductComponent() {
  const { trackAction } = useAnalytics();
  
  const handleAddToCart = (productId) => {
    trackAction('add_to_cart', { 
      product_id: productId,
      price: 29.99,
      quantity: 1
    });
    
    // Rest of handler logic
  };
  
  // Rest of component
}
```

### Mark Important Sessions

```typescript
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function CheckoutComponent() {
  const { markImportantSession } = useAnalytics();
  
  const startCheckout = () => {
    markImportantSession('checkout_started');
    
    // Rest of checkout logic
  };
  
  // Rest of component
}
```

## Troubleshooting

If you encounter issues with Clarity tracking:

1. Check browser console for any error messages
2. Verify the correct project ID is set in analytics.ts
3. Use browser developer tools to confirm the Clarity script is loaded correctly
4. Ensure 'use client' directive is present in components using the analytics hooks

## Next.js App Router Metadata Pattern

The implementation follows a pattern that allows using metadata with client components in the Next.js App Router:

1. Export metadata from a server component file (metadata.tsx)
2. Import and re-export it from the layout file
3. Use client components only after the layout level

## Privacy Considerations

- Clarity automatically excludes sensitive form fields like passwords
- User data is hashed before being sent to Clarity servers
- To comply with GDPR/privacy regulations, implement cookie consent via the `setConsent` function

For more details, see the [Clarity documentation](https://clarity.microsoft.com/docs). 