type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-5">
      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-400">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-[60ch] text-base leading-8 text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
