import Backdrop from "@/components/ui/Backdrop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Work from "@/components/site/Work";
import Capabilities from "@/components/site/Capabilities";
import Systems from "@/components/site/Systems";
import Sectors from "@/components/site/Sectors";
import Method from "@/components/site/Method";
import Engagements from "@/components/site/Engagements";
import Company from "@/components/site/Company";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <Backdrop />
      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <Work />
        <Capabilities />
        <Systems />
        <Sectors />
        <Method />
        <Engagements />
        <Company />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
