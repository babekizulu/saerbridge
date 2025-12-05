// libs
import { useState, useEffect, useRef, useCallback } from 'react';
//videos
import video1 from '../videos/Office_Scene.mp4';
import video2 from '../videos/Dust_Road_Scene.mp4';
//components
import Link from '../Link';

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

function About() {
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
            <video src={video1} autoPlay muted loop aria-label="Office Scene video" onError={(e) => console.error('Error loading video:', e)} />
            <video src={video2} autoPlay muted loop aria-label="Dust Road Scene video" onError={(e) => console.error('Error loading video:', e)} />
        </div>
      <div
        className="headline"
        style={{
          transform: `translateX(${headlineTranslateX}vw)`,
          willChange: 'transform',
        }}
      >
        <h1>about us_</h1>
      </div>
      <div className='about-content'>
        <h3>
        At Saerbridge, we aim to bridge the gap between ingenuity and opportunity by building next-generation data visualization systems that turn the complexity of South Africa into clarity.
        </h3>
        <p>
        We live in a nation overflowing with talent, creativity, and latent economic potential — yet too often these strengths remain invisible, fragmented, or underutilized.
        Millions have skills but no platform to reveal them. Municipalities plan without real-time insight. Entrepreneurs build solutions in the dark, disconnected from local needs. Workers hustle, innovate, and create — but lack the visibility that unlocks mobility.
        </p>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='about-content'>
        <h3>
        Saerbridge exists to change that.
        </h3>
        <p>
            We design technologies that make a <b>community legible to itself</b>:

            Tools that illuminate the <b>distribution of skills, industries, resources, and opportunities</b> across the landscape.

            Interfaces that give people — from job-seekers to policymakers — a <b>single, intuitive view</b> of their economic environment.

            Systems that allow citizens to <b>surface the needs, gaps, and potentials</b> of their neighbourhoods, enabling informed decision-making from the ground up.

            Our mission is not just to show data; it is to <b>activate it</b>.
            By bridging ingenuity and opportunity, we help individuals rise, businesses build, and communities self-correct.
            We believe a more prosperous South Africa begins with a clearer map — one that reveals who we are, where we are, and what we can create together.
        </p>
      </div>
    </section>
  );
}

export default About;