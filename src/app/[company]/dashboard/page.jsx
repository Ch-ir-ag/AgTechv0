import { notFound } from 'next/navigation';
import DashboardClient from "../../components/DashboardClient";
import { isValidCompany, formatCompanyName } from "../../data/companies";

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

  // Render the dashboard with company name
  return <DashboardClient companyName={companyName} />;
} 