
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MapViewPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');
  return (
    <Card className="w-full h-[calc(100vh-10rem)]">
      <CardHeader>
        <CardTitle className="font-headline">Global Hotspots</CardTitle>
        <CardDescription>
          AI-predicted high-risk areas for disease outbreaks.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full pb-6">
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
        </div>
      </CardContent>
    </Card>
  );
}
