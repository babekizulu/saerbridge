//components
import Link from './Link';
//icons
import logo from './icons/saerbridge_logo_60x60.svg';

function Logo() {
    return (
        <Link href='/' className='logo'>
            <img src={logo} alt='saerbridge logo' />
            <h1>Saerbridge_</h1>
        </Link>
    )
}

export default Logo;