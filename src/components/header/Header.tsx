import '../navbar/NavBar';
import NavBar from '../navbar/NavBar';
import classes from './Header.module.css';

const Header = () => (
    <header className={classes["header"]}>
        <NavBar/>
    </header>

);

export default Header;