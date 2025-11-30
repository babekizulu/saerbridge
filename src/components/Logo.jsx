//components
import Link from './Link';
//icons
import logo from './icons/saerbridge_logo_60x60.svg';

function Logo() {
    return (
        <Link href='/'>
            <img src={logo} alt='saerbridge logo' />
        </Link>
    )
}

export default Logo;