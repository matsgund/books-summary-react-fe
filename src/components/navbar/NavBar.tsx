import { Link, useLocation } from "react-router-dom";
import classes from './NavBar.module.css';
import usePageTracking from "@/utils/usePageTracking";

const NavBar = () => {
    // Using the useLocation hook to get the current location object
    const location = useLocation();

    // Destructuring pathname from the location object
    const { pathname } = location;

    // Splitting the pathname by the "/" delimiter
    const splitLocation = pathname.split("/");

    // Using the usePageTracking hook
    usePageTracking();

    return (
        <div className={classes["nav-component"]}>
            <nav>
                <ul>
                    <li className={pathname === "/" ? classes.active : ""}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={pathname === "/books" ? classes.active : ""}>
                        <Link to="/books">Books</Link>
                    </li>
                    <li className={pathname === "/about" ? classes.active : ""}>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
