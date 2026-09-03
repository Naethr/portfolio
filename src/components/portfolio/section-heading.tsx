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
    <div className="relative z-10 max-w-2xl space-y-5">
      <span className="theme-pill inline-flex rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em]">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="theme-text-primary text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
          {title}
        </h2>
        <p className="theme-text-secondary max-w-[60ch] text-base leading-8">
          {description}
        </p>
      </div>
    </div>
  );
}
