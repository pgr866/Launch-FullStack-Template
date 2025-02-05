import { About } from "./components/about";
import { Cta } from "./components/cta";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Navbar } from "./components/navbar";
import { Newsletter } from "./components/newsletter";
import { Pricing } from "./components/pricing";
import { ScrollToTop } from "./components/scroll-to-top";
import { Services } from "./components/services";
import { Sponsors } from "./components/sponsors";
import { Team } from "./components/team";
import { Testimonials } from "./components/testimonials";

export function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-2">
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
