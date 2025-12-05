// libs
import { useState, useEffect, useRef, useCallback } from 'react';
//components
import Link from '../Link';
//videos
import video1 from '../videos/Historical_Data_Visualization.mp4';
import video2 from '../videos/Cape_Town_Data_Retrieved.mp4';

// Easing function (cubic ease-out)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Helper: linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

// Distance over which scroll effect goes 0 → 1
const SCROLL_EFFECT_DISTANCE = 600;

// Distance over which typing effect progresses (in pixels)
const TYPING_SCROLL_DISTANCE = 800;

// Full text for narrator paragraphs
const HEADER_TEXT = '_Aletheia_';
const HEADER_TEXT_2 = '_geospatial_';
const NARRATOR_TEXT_1 =
  'Aletheia is a map for job-seekers and aspiring entrepreneurs - it\'s designed to display the distribution of skills demand across a national map of South Africa. It also allows users to create their own profiles and to be displayed on the map, in their relevant skill category.';
const NARRATOR_TEXT_2 =
  'Employers and entrepreneurs can use this map to find individuals that are looking for work, based on their skill and skill level. The map also provides a filter for regional needs, which is handy for entrepreneurs trying to develop solutions for their local communities.';

const ALETHEIA_DESCRIPTION =
  'These regional needs are measured by user reports, so that the application is relevant to users who simply want to see better service delivery in their local areas. So what is Aletheia? A real-time geospatial labour market information system.';

function RND() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);
  const isScrolling = useRef(false);

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
      <div className='hero-video'>
        <video src={video1} autoPlay muted loop aria-label="Historical Data Visualization video" onError={(e) => console.error('Error loading video:', e)} />
        <video src={video2} autoPlay muted loop aria-label="Cape Town Data Retrieved video" onError={(e) => console.error('Error loading video:', e)} />
      </div>
      <div
        className="headline"
        style={{
          transform: `translateX(${headlineTranslateX}vw)`,
          willChange: 'transform',
        }}
      >
        <h1>r&d_</h1>
      </div>
      <div className='article-content'>
        <h3>
        Creating a Real-Time Geospatial Labour Market Intelligence System
        </h3>
        <p>
            <b>Aletheia is a living map of South Africa’s skills, opportunities, and needs — continuously updated by the people who live them.</b>
            <br/>
            <br/>
            <br/>
            It is built for two kinds of users:

            <h3>Job-seekers</h3>
            <ul>
                <li>
                    <p>
                    Aletheia becomes your public, geographic portfolio.
                    </p>
                </li>
                <li>
                    <p>
                    You create a profile based on your skills, experience, and level of proficiency.
                    </p>
                </li>
                <li>
                    <p>
                    The platform geolocates your profile — not to your private address, but to your area or region, ensuring privacy while signalling opportunity.
                    </p>
                </li>
                <li>
                    <p>
                    Instead of endlessly applying to jobs, you can be discoverable, visible to employers and project creators who are actively looking for someone like you.
                    </p>
                </li>
            </ul>
            <h3>
        Entrepreneurs & Employers
        </h3>
        <p>
        <ul>
            <li>
                <p>
                Aletheia gives builders, businesses, and organisations a real-time, map-based talent radar.
                </p>
            </li>
            <li>
                <p>
                Search for specific skills across provinces, municipalities, or neighbourhoods.
                </p>
            </li>
            <li>
                <p>
                Filter by level (beginner → expert), availability, certifications, industry, or languages.
                </p>
            </li>
            <li>
                <p>
                Identify where a skill shortage or surplus exists — crucial for planning new businesses, hiring local talent, or designing targeted interventions.
                </p>
            </li>
        </ul>
        </p>
        </p>
        
      </div>
    </section>
  );
}

export default RND;