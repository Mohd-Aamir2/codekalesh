import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function DiseaseHeatmapPlaceholder() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-headline">Global Hotspots</CardTitle>
            <CardDescription>
              AI-predicted high-risk areas globally.
            </CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/map-view">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Map
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
}
