
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AlertDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  alert: Alert | null;
  insights?: string | null;
  isLoadingInsights?: boolean;
  isInsightsDialog?: boolean;
}

export function AlertDetailsDialog({
  isOpen,
  onClose,
  alert,
  insights,
  isLoadingInsights,
  isInsightsDialog = false,
}: AlertDetailsDialogProps) {
  if (!alert) {
    return null;
  }

  const title = isInsightsDialog ? 'AI Generated Insights' : 'Alert Details';
  const description = isInsightsDialog
    ? `Showing insights for the alert in ${alert.location}.`
    : `Detailed information for the alert in ${alert.location}.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isInsightsDialog ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Location</span>
                <span className="col-span-3">{alert.location}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Disease</span>
                <span className="col-span-3">{alert.disease}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Severity</span>
                <Badge
                  variant="destructive"
                  className={cn(
                    'w-fit',
                    alert.severity === 'High' && 'bg-orange-500',
                    alert.severity === 'Medium' && 'bg-yellow-500',
                    alert.severity === 'Low' && 'bg-blue-500',
                    'text-white'
                  )}
                >
                  {alert.severity}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-semibold">Date</span>
                <span className="col-span-3">{alert.date}</span>
              </div>
            </>
          ) : (
            <div>
              {isLoadingInsights ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{insights}</p>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
