
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { predictMosquitoBreeding } from '@/ai/flows/predict-mosquito-breeding';
import type { PredictMosquitoBreedingOutput } from '@/ai/flows/predict-mosquito-breeding';
import { Loader2, Pin, Wind } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock hotspot locations on the map
const hotspotMapPositions: { [key: string]: { top: string; left: string } } = {
  'Greenwood Park': { top: '30%', left: '25%' },
  'Riverside District': { top: '50%', left: '60%' },
  'Elm Street Suburbs': { top: '70%', left: '40%' },
  'Downtown Core': { top: '45%', left: '45%' },
};

export default function MosquitoPredictionPage() {
  const [prediction, setPrediction] =
    useState<PredictMosquitoBreedingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const satelliteImage = PlaceHolderImages.find(img => img.id === 'satellite-map-placeholder');


  const handlePrediction = async () => {
    setIsLoading(true);
    setPrediction(null);
    try {
      // In a real app, this data would come from APIs or file uploads.
      const mockInput = {
        weatherData:
          'Temp: 32°C, Humidity: 85%, Rainfall: 150mm in last 48 hours. Forecast: More rain expected.',
        satelliteImageryData: satelliteImage?.imageUrl || '', // Using placeholder image as data URI
        historicalCaseData:
          'location,cases\nGreenwood Park,12\nRiverside District,8\nElm Street Suburbs,5',
      };
      const result = await predictMosquitoBreeding(mockInput);
      setPrediction(result);
    } catch (error) {
      console.error('Failed to get prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Wind className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Mosquito Breeding Prediction
          </h1>
          <p className="text-muted-foreground">
            Use AI to predict breeding hotspots for Dengue and Malaria vectors.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Prediction</CardTitle>
          <CardDescription>
            Click the button to run the AI prediction model based on current
            environmental data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handlePrediction} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading
              ? 'Analyzing Data...'
              : 'Predict Breeding Hotspots'}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Hotspots</CardTitle>
              <CardDescription>
                AI-identified high-risk areas for mosquito breeding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {prediction.predictedHotspots.map((hotspot) => (
                <div
                  key={hotspot.location}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{hotspot.location}</p>
                    <Badge
                      className={cn(
                        hotspot.riskLevel === 'High' &&
                          'bg-destructive text-destructive-foreground',
                        hotspot.riskLevel === 'Medium' && 'bg-yellow-500',
                        hotspot.riskLevel === 'Low' && 'bg-blue-500'
                      )}
                    >
                      {hotspot.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hotspot.reasoning}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
              <CardTitle>Fogging Recommendations</CardTitle>
              <CardDescription>
                Critical locations requiring immediate fogging.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-96 rounded-lg overflow-hidden border">
                    {satelliteImage && (
                        <Image
                            src={satelliteImage.imageUrl}
                            alt={satelliteImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={satelliteImage.imageHint}
                        />
                    )}
                    <TooltipProvider>
                    {prediction.foggingRecommendations.map((location) => {
                        const position = hotspotMapPositions[location];
                        if (!position) return null;
                        
                        return (
                            <Tooltip key={location}>
                                <TooltipTrigger asChild>
                                    <div
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: position.top, left: position.left }}
                                    >
                                        <Pin className="h-8 w-8 text-red-500 fill-red-500/50" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-bold">Fog Now: {location}</p>
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    </TooltipProvider>
                </div>
            </CardContent>
          </Card>
        </div>
      )}

      {prediction && (
         <Card>
            <CardHeader>
                <CardTitle>AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{prediction.summary}</p>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
