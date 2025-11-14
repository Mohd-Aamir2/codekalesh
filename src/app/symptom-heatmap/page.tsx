
'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

// Mock locations for hotspots, as we don't have real coordinates.
const hotspotLocations: { [key: string]: { top: string; left: string } } = {
  'West Suburb': { top: '40%', left: '20%' },
  'North District': { top: '25%', left: '50%' },
  'East Bay': { top: '50%', left: '80%' },
  'Central City': { top: '60%', left: '35%' },
  'South Valley': { top: '75%', left: '60%' },
  'Downtown': { top: '45%', left: '65%' },
  'Uptown': { top: '30%', left: '75%' },
};

const getRiskColor = (riskScore: number) => {
  if (riskScore > 0.7) return 'bg-red-500';
  if (riskScore > 0.4) return 'bg-yellow-500';
  return 'bg-blue-500';
};

const getRiskLabel = (riskScore: number) => {
  if (riskScore > 0.7) return 'High';
  if (riskScore > 0.4) return 'Medium';
  return 'Low';
};

export default function SymptomHeatmapPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');
  const firestore = useFirestore();
  const [symptomFilter, setSymptomFilter] = useState('all');

  const reportsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const baseQuery = collection(firestore, 'symptom_reports_public');
    if (symptomFilter === 'all') {
      return baseQuery;
    }
    return query(
      baseQuery,
      where('reportedSymptoms', 'array-contains', symptomFilter)
    );
  }, [firestore, symptomFilter]);

  const { data: reports, isLoading } = useCollection(reportsQuery);

  const uniqueSymptoms = useMemo(() => {
    const allSymptoms = reports?.flatMap((r) => r.reportedSymptoms) || [];
    return ['all', ...Array.from(new Set(allSymptoms))];
  }, [reports]);

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="font-headline">Symptom Heatmap</CardTitle>
              <CardDescription>
                Real-time heatmap of crowdsourced symptom reports.
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <Select value={symptomFilter} onValueChange={setSymptomFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by symptom..." />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSymptoms.map((symptom) => (
                    <SelectItem key={symptom} value={symptom} className="capitalize">
                      {symptom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[calc(100vh-16rem)]">
          <TooltipProvider>
            <div className="relative w-full h-full rounded-lg overflow-hidden border">
              {mapImage && (
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
              )}
              {isLoading ? (
                 Object.values(hotspotLocations).map((pos, i) => (
                    <Skeleton key={i} className="absolute w-4 h-4 rounded-full" style={{ top: pos.top, left: pos.left }} />
                 ))
              ) : (
                reports?.map((report) => {
                  const position = hotspotLocations[report.location];
                  if (!position) return null;

                  return (
                    <Tooltip key={report.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute w-4 h-4 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            top: position.top,
                            left: position.left,
                            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          <div
                            className={cn(
                              'w-full h-full rounded-full',
                              getRiskColor(report.riskScore)
                            )}
                          ></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold capitalize">{report.location}</p>
                        <p className='text-sm capitalize'>
                          Symptoms: {report.reportedSymptoms.join(', ')}
                        </p>
                        <p className="text-sm">
                          Risk:{' '}
                          <span
                            className={cn(
                              'font-semibold',
                              getRiskLabel(report.riskScore) === 'High' && 'text-red-500',
                              getRiskLabel(report.riskScore) === 'Medium' && 'text-yellow-500',
                              getRiskLabel(report.riskScore) === 'Low' && 'text-blue-500'
                            )}
                          >
                            {getRiskLabel(report.riskScore)} ({report.riskScore.toFixed(2)})
                          </span>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })
              )}
            </div>
          </TooltipProvider>
        </CardContent>
       </Card>
    </div>
  );
}
