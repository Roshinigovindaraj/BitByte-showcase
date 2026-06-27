import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Customization from './components/Customization';
import Process from './components/Process';
import CTA from './components/CTA';
import Footer from './components/Footer';
import DesignGallery from './components/DesignGallery';
import DigitalMarketingShowcase from './components/DigitalMarketingShowcase';

export default function App() {
  // null = landing page; { slug, category } = gallery page
  const [galleryPage, setGalleryPage] = useState(null);

  const digitalMarketShowcases = [
    {
      title: 'Marketplace & Multi-Vendor',
      description: 'Launch a polished online marketplace with vendor dashboards, search filters, and conversion-focused product pages.',
      badge: 'Fast Growth',
    },
    {
      title: 'Digital Commerce',
      description: 'Create a sleek storefront for products, subscriptions, and campaign-led promotions with a premium modern feel.',
      badge: 'Modern UX',
    },
  ];

  // When navigating to gallery, scroll to top
  const openGallery = (site) => {
    setGalleryPage({ slug: site.slug, category: site.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When going back, scroll to the showcase section on the landing page
  const goBack = () => {
    setGalleryPage(null);
    // Short delay so DOM re-renders first, then scroll to showcase
    setTimeout(() => {
      const el = document.getElementById('showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Keep page title in sync
  useEffect(() => {
    if (galleryPage) {
      document.title = `${galleryPage.category} Designs — WebCraft Studio`;
    } else {
      document.title = 'BitByte – Premium Website Designs';
    }
  }, [galleryPage]);

  // ── Gallery page ────────────────────────────────────────────────────────────
  if (galleryPage) {
    return (
      <DesignGallery
        slug={galleryPage.slug}
        categoryName={galleryPage.category}
        onBack={goBack}
      />
    );
  }

  // ── Landing page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Showcase onViewDesigns={openGallery} />
        <section id="digital-market-showcase" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <span className="inline-block px-4 py-1.5 bg-violet-50 text-violet-600 text-sm font-semibold rounded-full mb-4 border border-violet-100">
                Digital Market Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                Premium digital commerce and marketplace concepts
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Explore modern storefronts designed for growth, trust, and a smooth shopping experience.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <DigitalMarketingShowcase />
            </div>
          </div>
        </section>
        <Customization />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
