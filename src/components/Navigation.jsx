//components
import Link from './Link';

function Navigation() {
    return (
        <nav className='header-nav'>
            <ul>
                <li>
                    <Link href='/' className='nav-link liquid-glass' >
                        home
                    </Link>
                </li>
                <li>
                    <Link href='/about' className='nav-link liquid-glass'>
                        about
                    </Link>
                </li>
                <li>
                    <Link href='/products' className='nav-link liquid-glass'>
                        products
                    </Link>
                </li>
                <li>
                    <Link href='/researchanddevelopment' className='nav-link liquid-glass'>
                        research & development
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;