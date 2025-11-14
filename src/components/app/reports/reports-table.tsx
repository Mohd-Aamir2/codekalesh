
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RECENT_ALERTS } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ReportsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Detailed Reports</CardTitle>
        <CardDescription>
          A comprehensive list of all generated reports and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_ALERTS.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium">{alert.location}</TableCell>
                <TableCell>{alert.disease}</TableCell>
                <TableCell>
                  <Badge
                    variant="destructive"
                    className={cn(
                      alert.severity === 'High' && 'bg-orange-500',
                      alert.severity === 'Medium' && 'bg-yellow-500',
                      alert.severity === 'Low' && 'bg-blue-500',
                      'text-white'
                    )}
                  >
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>{alert.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
