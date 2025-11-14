import { DiseaseReportsChart } from '@/components/app/reports/disease-reports-chart';
import { AlertsBySeverityChart } from '@/components/app/reports/alerts-by-severity-chart';
import { ReportsTable } from '@/components/app/reports/reports-table';

export default function ReportsPage() {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <DiseaseReportsChart />
        <AlertsBySeverityChart />
      </div>
      <div>
        <ReportsTable />
      </div>
    </div>
  );
}
