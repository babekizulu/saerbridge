//components
import Logo from './Logo';
import Navigation from './Navigation';
import { useState, useEffect, useCallback, useRef } from 'react';

// Distance over which opacity goes from 0 to 1
const SCROLL_DISTANCE = 1200;

function Header() {
    const [opacity, setOpacity] = useState(0);
    const rafId = useRef(null);
    const isScrolling = useRef(false);

    const handleScroll = useCallback(() => {
        if (isScrolling.current) return;
        isScrolling.current = true;

        rafId.current = requestAnimationFrame(() => {
            const scrollY =
                window.scrollY ??
                window.pageYOffset ??
                document.documentElement.scrollTop ??
                0;

            // Calculate opacity: 0 at top, 1 after SCROLL_DISTANCE pixels
            const raw = scrollY / SCROLL_DISTANCE;
            const clamped = Math.min(Math.max(raw, 0), 1);
            setOpacity(clamped);

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

    // Convert hex to rgba for opacity control
    const backgroundColor = `rgba(190, 202, 208, ${opacity})`;

    return (
        <header 
            className='header' 
            style={{ backgroundColor }}
        >
            <Logo />
            <Navigation />
        </header>
    )
}

export default Header;