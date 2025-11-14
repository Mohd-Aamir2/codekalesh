import { HomeNavbar } from './home-navbar';
import { Footer } from './footer';
import { Button } from '../ui/button';
import Link from 'next/link';

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto max-w-4xl text-center">
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
      </main>
      <Footer />
    </div>
  );
}
