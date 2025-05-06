# Microsoft Clarity Integration

This project includes Microsoft Clarity for user behavior analytics.

## Setup Instructions

1. **Install the Package**
   ```bash
   npm install @microsoft/clarity
   ```

2. **Configure Your Project ID**
   
   Navigate to `src/app/config/analytics.ts` and replace the placeholder with your actual Clarity project ID:
   
   ```typescript
   export const CLARITY_PROJECT_ID = "your-actual-project-id";
   ```
   
   You can find your project ID in the Microsoft Clarity dashboard under Settings > Overview.

## Features Implemented

- **Auto-initialization**: Clarity is automatically initialized when the app loads via the Root Layout component
- **User identification**: Users are identified with Clarity when they log in 
- **Event tracking**: Various user interactions are tracked as events
- **Custom tags**: User data like company is tracked as tags
- **Custom hooks**: A `useAnalytics` hook is available for tracking across components

## Usage Examples

### Track Page Views

```typescript
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function SomePage() {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    trackPageView('product_page', 'product-123');
  }, []);
  
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

## Privacy Considerations

- Clarity automatically excludes sensitive form fields like passwords
- User data is hashed before being sent to Clarity servers
- To comply with GDPR/privacy regulations, implement cookie consent via the `setConsent` function

For more details, see the [Clarity documentation](https://clarity.microsoft.com/docs). 