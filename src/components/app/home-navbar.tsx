'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

export function HomeNavbar() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">Sentinel</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {isUserLoading ? null : user ? (
            <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
