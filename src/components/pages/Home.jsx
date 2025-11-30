// libs
import { useState, useEffect, useRef, useCallback } from 'react';
// videos
import video1 from '../videos/Nostalgic_Scene.mp4';
import video2 from '../videos/African_Subway.mp4';

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

  // Typing effect states
  const [displayedHeaderText, setDisplayedHeaderText] = useState('');
  const [displayedHeaderText2, setDisplayedHeaderText2] = useState('');
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');

  // Refs for paragraph containers
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);

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

      // 2) Scroll-based typing effect for paragraph 1
      if (paragraph1Ref.current) {
        const rect = paragraph1Ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate when paragraph enters viewport (top of paragraph reaches bottom of viewport)
        const entryPoint = windowHeight;
        
        // Calculate progress: 0 when at entryPoint, 1 after scrolling TYPING_SCROLL_DISTANCE
        let progress = 0;
        if (rect.top <= entryPoint) {
          progress = Math.min(
            Math.max((entryPoint - rect.top) / TYPING_SCROLL_DISTANCE, 0),
            1
          );
        }
        
        // Map progress to character index
        const charIndex = Math.floor(progress * NARRATOR_TEXT_1.length);
        const charIndex2 = Math.floor(progress * HEADER_TEXT.length);
        setDisplayedHeaderText(HEADER_TEXT.slice(0, charIndex2));
        setDisplayedText1(NARRATOR_TEXT_1.slice(0, charIndex));
      }

      // 3) Scroll-based typing effect for paragraph 2
      if (paragraph2Ref.current) {
        const rect = paragraph2Ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate when paragraph enters viewport (top of paragraph reaches bottom of viewport)
        const entryPoint = windowHeight;
        
        // Calculate progress: 0 when at entryPoint, 1 after scrolling TYPING_SCROLL_DISTANCE
        let progress = 0;
        if (rect.top <= entryPoint) {
          progress = Math.min(
            Math.max((entryPoint - rect.top) / TYPING_SCROLL_DISTANCE, 0),
            1
          );
        }
        
        // Map progress to character index
        const charIndex = Math.floor(progress * NARRATOR_TEXT_2.length);
        const charIndex2 = Math.floor(progress * HEADER_TEXT_2.length);
        setDisplayedHeaderText2(HEADER_TEXT_2.slice(0, charIndex2));
        setDisplayedText2(NARRATOR_TEXT_2.slice(0, charIndex));
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
     <div className='hero'>
        <div className="hero-content-1">
          <h2>{displayedHeaderText}</h2>
          <p ref={paragraph1Ref}>
            {displayedText1}
            {displayedText1.length < NARRATOR_TEXT_1.length && (
              <span className="typing-cursor">|</span>
            )}
          </p>
        </div>
        <div className="hero-content-2">
          <h2>{displayedHeaderText2}</h2>
          <p ref={paragraph2Ref}>
            {displayedText2}
            {displayedText2.length < NARRATOR_TEXT_2.length && (
              <span className="typing-cursor">|</span>
            )}
          </p>
        </div>
     </div>
    </section>
  );
}

export default Home;
