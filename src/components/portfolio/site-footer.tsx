import { socialLinks } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="py-8 sm:py-10">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6 border-t border-white/8 px-4 pt-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">© 2026 Théo Villalba. Tous droits réservés.</p>
          <p className="text-xs leading-relaxed">Les marques, logos et noms de produits tiers appartiennent à leurs propriétaires respectifs.</p>
        </div>
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
