import { socialLinks } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="py-8 sm:py-10">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 border-t border-white/8 px-4 pt-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Portfolio pensé pour un web sobre, rapide et lisible.</p>
        <div className="flex flex-wrap items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
