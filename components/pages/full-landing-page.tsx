import {
  Careers,
  Contact,
  Departments,
  Footer,
  Hero,
  Leadership,
  Nav,
  ServiceStrip,
  WhyUs,
} from "@/components/sections";

export function FullLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <ServiceStrip />
        <Departments />
        <WhyUs />
        <Careers />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
