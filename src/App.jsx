import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Customization from './components/Customization';
import Process from './components/Process';
import CTA from './components/CTA';
import Footer from './components/Footer';
import DesignGallery from './components/DesignGallery';

export default function App() {
  // null = landing page; { slug, category } = gallery page
  const [galleryPage, setGalleryPage] = useState(null);

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
        <Customization />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
