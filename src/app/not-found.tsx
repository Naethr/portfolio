export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4">
      <div className="max-w-xl space-y-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-base leading-8 text-slate-600">
          The link may have changed, or the page may not be available yet.
        </p>
        <a
          href="/"
          className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
