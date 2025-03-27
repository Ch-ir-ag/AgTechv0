import { notFound } from 'next/navigation';
import DashboardClient from "../../components/DashboardClient";
import { isValidCompany, formatCompanyName } from "../../data/companies";
import { loadCompanyData } from "../../utils/companyDataLoader";
import { loadChartData } from "../../utils/chartDataLoader";

/**
 * CompanyDashboard page component
 * Server component that validates the company and loads the data
 */
export default function CompanyDashboard({ params }) {
  const { company } = params;
  
  // Check if the company is valid
  if (!isValidCompany(company)) {
    notFound();
  }

  // Format company name
  const companyName = formatCompanyName(company);
  
  // Load company data if needed for other components
  // const companyData = loadCompanyData(company);
  
  // Since we're using the useParams hook in MilkYieldChart, we don't need to pass chart data
  // The chart data will be loaded based on the URL in the client component

  // Render the dashboard with company name and suppressHydrationWarning
  return <DashboardClient companyName={companyName} />;
} 