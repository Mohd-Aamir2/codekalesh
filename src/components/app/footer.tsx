export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex-col gap-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; 2024 Sentinel. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
