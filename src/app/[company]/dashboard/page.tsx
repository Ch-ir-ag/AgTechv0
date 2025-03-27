import { notFound } from 'next/navigation';
import DashboardClient from "../../components/DashboardClient";

// List of valid companies
const validCompanies = ['lakeland-dairies'];

type PageParams = {
  company: string;
};

export default function CompanyDashboard({ params }: { params: PageParams }) {
  // Check if the company is valid
  if (!validCompanies.includes(params.company)) {
    notFound();
  }

  // Format company name for display (e.g., "lakeland-dairies" -> "Lakeland Dairies")
  const companyName = params.company
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return <DashboardClient companyName={companyName} />;
} 