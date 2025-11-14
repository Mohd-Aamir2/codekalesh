import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Hospital, Pill, Cloud, MessageCircle } from 'lucide-react';

const dataSources = [
  {
    name: 'Hospital Data',
    description: 'Patient admission records and diagnoses from partner hospitals.',
    icon: Hospital,
  },
  {
    name: 'Pharmacy Data',
    description: 'Over-the-counter medication sales data from pharmacies.',
    icon: Pill,
  },
  {
    name: 'Weather Data',
    description: 'Real-time weather conditions and forecasts from weather APIs.',
    icon: Cloud,
  },
  {
    name: 'Social Media Data',
    description: 'Public posts and search trends related to health symptoms.',
    icon: MessageCircle,
  },
];

export default function DataSourcesPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Database className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Data Sources</h1>
          <p className="text-muted-foreground">
            An overview of the data sources powering the AI model.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map((source) => (
          <Card key={source.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {source.name}
              </CardTitle>
              <source.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {source.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
