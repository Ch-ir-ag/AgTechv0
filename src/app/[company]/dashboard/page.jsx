import { notFound } from 'next/navigation';
import DashboardClient from "../../components/DashboardClient";
import { isValidCompany, formatCompanyName } from "../../data/companies";
import { loadCompanyData } from "../../utils/companyDataLoader";

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
  
  // Load company data (already returns plain objects)
  const companyData = loadCompanyData(company);

  // Render the dashboard with company data
  return <DashboardClient companyName={companyName} companyData={companyData} />;
} 