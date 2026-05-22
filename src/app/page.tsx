import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <PortfolioPage />
      <SiteFooter />
    </>
  );
}
