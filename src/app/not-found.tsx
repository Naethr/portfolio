import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4">
      <div className="max-w-xl space-y-6 text-center">
        <p className="theme-text-subtle text-sm font-medium uppercase tracking-[0.18em]">
          404
        </p>
        <h1 className="theme-text-primary text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="theme-text-secondary text-base leading-8">
          The link may have changed, or the page may not be available yet.
        </p>
        <Link
          href="/"
          className="theme-accent-control inline-flex rounded-full border px-5 py-3 text-sm font-medium transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
