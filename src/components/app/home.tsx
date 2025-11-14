import { HomeNavbar } from './home-navbar';
import { Footer } from './footer';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BrainCircuit, DatabaseZap, BellRing, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { HealthGuardAIChatbot } from './health-guard-ai-chatbot';

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'AI-Powered Predictions',
    description:
      'Leverage advanced machine learning to forecast potential outbreaks with high accuracy.',
    icon: BrainCircuit,
  },
  {
    title: 'Real-Time Data Integration',
    description:
      'Aggregates data from hospitals, social media, and weather APIs for comprehensive analysis.',
    icon: DatabaseZap,
  },
  {
    title: 'Instant Alert System',
    description:
      'Receive immediate notifications for high-risk zones to enable swift, life-saving action.',
    icon: BellRing,
  },
  {
    title: 'Global Hotspot Mapping',
    description:
      'Visualize outbreak hotspots on an interactive global map to track spread and severity.',
    icon: Globe,
  },
];

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 text-center md:py-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              AI-Powered Outbreak Detection
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Sentinel uses cutting-edge AI to analyze real-time data from
              multiple sources, predicting and identifying disease outbreaks
              before they spread.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50/50 dark:bg-transparent py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Key Features
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Discover the powerful tools Sentinel offers for proactive disease surveillance.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                      <feature.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="pt-4 font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <HealthGuardAIChatbot />
      <Footer />
    </div>
  );
}
