export default function Footer() {
  return (
    <footer className="border-t border-secondary px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-serif text-lg">Park Bench Prints</p>
          <p className="mt-1 text-sm text-foreground/50">
            Print &amp; Paper, Haarlem
          </p>
        </div>

        <div className="flex gap-6 text-foreground/40">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="mailto:hello@parkbenchprints.com"
            className="transition-colors hover:text-foreground"
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-foreground/30">
        &copy; {new Date().getFullYear()} Park Bench Prints. All rights reserved.
      </p>
    </footer>
  );
}
