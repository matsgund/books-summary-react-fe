import {Link} from "react-router-dom";
import classes from './NavBar.module.css'

const NavBar = () => {
    return (
        <div className={classes["nav-component"]}>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/books"}>Books</Link>
                    </li>
                    <li>
                        <Link to={"/about"}>About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;