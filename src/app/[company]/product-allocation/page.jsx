import { notFound } from 'next/navigation';
import ProductAllocationPage from "../../components/ProductAllocationPage";
import { isValidCompany, formatCompanyName } from "../../data/companies";
import Script from 'next/script';

/**
 * Product Allocation page component
 * Server component that validates the company and loads the data
 */
export default function CompanyProductAllocation({ params }) {
  const { company } = params;
  
  // Check if the company is valid
  if (!isValidCompany(company)) {
    notFound();
  }

  // Format company name
  const companyName = formatCompanyName(company);
  
  // Render the product allocation page with company name
  return (
    <>
      {/* Inline script to immediately scroll to top when navigating directly to this page */}
      <Script id="scroll-to-top" strategy="beforeInteractive">
        {`
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            history.scrollRestoration = 'manual';
            document.documentElement.style.scrollBehavior = 'auto';
            
            // Force scroll to top multiple times to overcome any automatic scrolling
            setTimeout(() => { window.scrollTo(0, 0); }, 0);
            setTimeout(() => { window.scrollTo(0, 0); }, 50);
            setTimeout(() => { window.scrollTo(0, 0); }, 100);
          }
        `}
      </Script>
      <ProductAllocationPage companyName={companyName} />
    </>
  );
} 