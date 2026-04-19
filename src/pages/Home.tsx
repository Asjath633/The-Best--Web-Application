import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/sections/Hero';
import Story from '@/sections/Story';
import Testimonials from '@/sections/Testimonials';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Story />
      <Testimonials />
    </>
  );
}
