import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Products from './pages/Products.jsx';
import Projects from './pages/Projects.jsx';
import Epr from './pages/Epr.jsx';
// Expertise is now merged into Services

export default function App() {
  const location = useLocation();

  // Scroll to top on route change, unless there's a hash anchor to honour
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      // Defer to next tick so the target element exists in the DOM
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a href="#main" className="skip">Skip to main content</a>
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main id="main" key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/epr" element={<Epr />} />
          {/* Expertise merged into Services — redirect old URL */}
          <Route path="/expertise" element={<Navigate to="/services" replace />} />
          {/* Contact merged into About — preserve old links */}
          <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-4">Page not found.</h1>
        <p className="body-lg mt-4">The page you’re looking for doesn’t exist.</p>
      </div>
    </section>
  );
}
