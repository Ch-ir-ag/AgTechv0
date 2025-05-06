# Microsoft Clarity Integration

This project includes Microsoft Clarity for user behavior analytics.

## Implementation Method

Microsoft Clarity has been integrated using two methods:

1. **Script Tag (Primary Method)**: The script is injected directly in the layout.tsx file using Next.js Script component
2. **NPM Package (Secondary Method)**: The @microsoft/clarity package is available for programmatic interaction

## Configuration

The Clarity project ID is stored in `src/app/config/analytics.ts`:

```typescript
export const CLARITY_PROJECT_ID = "rfk8ck3fva";
```

## Features Implemented

- **Auto-initialization**: Clarity is automatically initialized when the app loads via the Script tag
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

## Privacy Considerations

- Clarity automatically excludes sensitive form fields like passwords
- User data is hashed before being sent to Clarity servers
- To comply with GDPR/privacy regulations, implement cookie consent via the `setConsent` function

For more details, see the [Clarity documentation](https://clarity.microsoft.com/docs). 