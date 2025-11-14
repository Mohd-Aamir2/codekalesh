
'use client';

import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RECENT_ALERTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Alert } from '@/lib/types';
import { generateAlertInsights } from '@/ai/flows/generate-alert-insights';
import { AlertDetailsDialog } from './alert-details-dialog';

export function RecentAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailsOpen(true);
  };

  const handleGenerateInsights = async (alert: Alert) => {
    setSelectedAlert(alert);
    setIsInsightsOpen(true);
    setIsLoadingInsights(true);
    setInsights(null);
    try {
      const alertDetails = `Alert for ${alert.disease} in ${alert.location} with ${alert.severity} severity, reported on ${alert.date}.`;
      const result = await generateAlertInsights({ alertDetails });
      setInsights(result.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      setInsights('There was an error generating insights. Please try again.');
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const closeDetailsDialog = () => {
    setIsDetailsOpen(false);
    setSelectedAlert(null);
  };
  
  const closeInsightsDialog = () => {
    setIsInsightsOpen(false);
    setSelectedAlert(null);
    setInsights(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Alerts</CardTitle>
          <CardDescription>
            Live alerts triggered by the AI detection system.
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_ALERTS.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">
                    {alert.location}
                  </TableCell>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(alert)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleGenerateInsights(alert)}
                        >
                          Generate Insights
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDetailsDialog
        isOpen={isDetailsOpen}
        onClose={closeDetailsDialog}
        alert={selectedAlert}
      />

      <AlertDetailsDialog
        isOpen={isInsightsOpen}
        onClose={closeInsightsDialog}
        alert={selectedAlert}
        insights={insights}
        isLoadingInsights={isLoadingInsights}
        isInsightsDialog={true}
      />
    </>
  );
}
