import classes from './HomePage.module.css';
import { Link } from 'react-router-dom';
import HomePageBooks from './components/homepageBooks/homePageBooks';


const HomePage = () => {

    return (
        <div className={classes["home-grid-container"]}>
            <div className={classes["home-aside"]}></div>
            <div className={classes["home-main"]}>
                <div>
                <h1>The Summary Hub</h1>
                <p> Find the best book summaries here. Our team has handpicked the most engaging and thought-provoking books and summarized the key points for you, making it easy to get important information from each book.
                </p>
                <Link to="/books">
                    <button className="btn btn-action">
                        View our books
                    </button>
                </Link>
                </div>
                <div className={classes["home-main-books"]}>
                    <HomePageBooks />
                </div>
            </div>
        </div>
     )
}

export default HomePage;

