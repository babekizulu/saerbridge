// libs
import { useState, useEffect, useRef, useCallback } from 'react';
//components
import Link from '../Link';
// videos
import video1 from '../videos/Nostalgic_Scene.mp4';
import video2 from '../videos/African_Subway.mp4';
import video3 from '../videos/Contemplative_Elder.mp4';
// Easing function (cubic ease-out)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Helper: linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

// Distance over which scroll effect goes 0 → 1
const SCROLL_EFFECT_DISTANCE = 600;

// Distance over which typing effect progresses (in pixels)
const TYPING_SCROLL_DISTANCE = 800;

// Full text for narrator paragraphs
const HEADER_TEXT = '_bridges_';
const HEADER_TEXT_2 = '_maps_';
const NARRATOR_TEXT_1 =
  'Narrator: At Saerbridge we aim to bridge the gap between ingenuity and opportunity by creating data visualization software to give workers, employees, entrepreneurs and local governments a seamless and intuitive view into their environment and its needs.';
const NARRATOR_TEXT_2 =
  'The world has never been so connected, and yet so experientially disconnected due to unequal access to critical information. Our goal is to create maps that reveal the dynamics that make our economies work — and make those maps available to everyone, from every corner of the globe.';

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);
  const isScrolling = useRef(false);
  // Refs for parallax effect
  const heroRef = useRef(null);
  const newResearchH2Ref = useRef(null);
  
  // State for parallax translateX
  const [newResearchTranslateX, setNewResearchTranslateX] = useState(0);

  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    rafId.current = requestAnimationFrame(() => {
      // 1) scroll progress local to first 600px
      const scrollY =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        0;

      const raw = scrollY / SCROLL_EFFECT_DISTANCE;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setScrollProgress(clamped);

      // 4) Parallax effect for new-research h2
      if (heroRef.current && newResearchH2Ref.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        // Get the absolute bottom position of hero div (relative to document)
        const heroBottomAbsolute = scrollY + heroRect.bottom;
        
        // Activation point: 200px above bottom of hero div
        const activationPoint = heroBottomAbsolute - 200;
        
        // Only activate when scroll position reaches activation point
        if (scrollY >= activationPoint) {
          // Calculate parallax progress
          // Distance scrolled past activation point
          const scrolledPast = scrollY - activationPoint;
          
          // Parallax speed factor (adjust for desired speed)
          const parallaxSpeed = 0.5;
          
          // Calculate translateX value (starts at 0, moves right as user scrolls)
          const translateX = scrolledPast * parallaxSpeed;
          setNewResearchTranslateX(translateX);
        } else {
          // Before activation point, keep at 0
          setNewResearchTranslateX(0);
        }
      }

      isScrolling.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calc
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      isScrolling.current = false;
    };
  }, [handleScroll]);

  // Derived animation values
  const t = easeOutCubic(Math.min(Math.max(scrollProgress, 0), 1));

  // Headline moves off to the right as user scrolls
  const headlineTranslateX = lerp(0, 100, t); // 0vw to 100vw

  return (
    <section className="page">
      <div className="hero-video">
        <video
          src={video1}
          autoPlay
          muted
          loop
          aria-label="Nostalgic scene video"
          onError={(e) => console.error('Error loading video:', e)}
        />
        <video
          src={video2}
          autoPlay
          muted
          loop
          aria-label="African subway video"
          onError={(e) => console.error('Error loading video:', e)}
        />
        <video
          src={video3}
          autoPlay
          muted
          loop
          aria-label="Contemplative elder video"
          onError={(e) => console.error('Error loading video:', e)}
        />
      </div>

      <div
        className="headline"
        style={{
          transform: `translateX(${headlineTranslateX}vw)`,
          willChange: 'transform',
        }}
      >
        <h1>in service of_</h1>
      </div>
     <div className='hero' ref={heroRef}>
        <div className="hero-content">
          <h2>_bridges</h2>
          <p>
          At Saerbridge we aim to bridge the gap between ingenuity and opportunity by creating data visualization software to give workers, employees, entrepreneurs and local governments a seamless and intuitive view into their environment and its needs.
          </p>
          <Link href='/about' className='read-more'>learn more</Link>
        </div>
        
        <div className="hero-content">
          <h2>_maps_</h2>
          <p>
          The world has never been so connected, and yet so experientially disconnected due to unequal access to critical information. Our goal is to create maps that reveal the dynamics that make our economies work — and make those maps available to everyone, from every corner of the globe.
          </p>
          <Link href='/about' className='read-more'>learn more</Link>
        </div>
     </div>
     <div className='new-research'>
      <h2 
        ref={newResearchH2Ref}
        style={{
          transform: `translateX(${newResearchTranslateX}px)`,
          willChange: 'transform',
        }}
      >
        Aletheia
      </h2>
      <p>
      Alethea is a map for job-seekers, and aspiring entrepreneurs - it’s designed to display the distribution of skills demand across a national map of South Africa. It also allows users to create their own profiles and to be displayed on the map, in their relevant skill category. Employers and entrepreneurs can use this map to find individuals that are looking for work, based on their skill and skill level. The map also provides a filter for regional needs, which is handy for entrepreneurs trying to develop solutions for their local communities. These regional needs are measured by user reports, so that the application is relevant to users who simply want to see better service delivery in their local areas. So what is Aleatheia? A real-time geospatial labour market information system.
      </p>
      <Link href='/researchanddevelopment' className='read-more'>learn more</Link>
     </div>
    </section>
  );
}

export default Home;
