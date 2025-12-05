//components
import { useState } from 'react';
import Link from './Link';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className='header-nav'>
                <ul>
                    <li>
                        <Link href='/' className='nav-link' >
                            home
                        </Link>
                    </li>
                    <li>
                        <Link href='/about' className='nav-link'>
                            about
                        </Link>
                    </li>
                    {/*<li>
                        <Link href='/products' className='nav-link liquid-glass'>
                            products
                        </Link>
                    </li>*/}
                    <li>
                        <Link href='/researchanddevelopment' className='nav-link'>
                            research & development
                        </Link>
                    </li>
                    <li>
                        <Link href='/team' className='nav-link'>
                            team
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <button 
                className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
                <nav className='mobile-nav'>
                    <ul>
                        <li>
                            <Link href='/' className='mobile-nav-link' onClick={closeMenu}>
                                home
                            </Link>
                        </li>
                        <li>
                            <Link href='/about' className='mobile-nav-link' onClick={closeMenu}>
                                about
                            </Link>
                        </li>
                        <li>
                            <Link href='/researchanddevelopment' className='mobile-nav-link' onClick={closeMenu}>
                                research & development
                            </Link>
                        </li>
                        <li>
                            <Link href='/team' className='mobile-nav-link' onClick={closeMenu}>
                                team
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navigation;