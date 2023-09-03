import classes from './AboutPage.module.css';
import image from '@/assets/images/background-about-page.png';

const AboutPage = () => {
  return (
    <div className={classes["about-grid-container"]}>
        <div className={classes["about-image-container"]}>
            <img src={image} alt="book"/>
        </div>
        <div className={classes["about-text-container"]}>
            <h1>About</h1>
            <p>
            The Summary Hub is not just a platform, it's a team of dedicated book lovers who are passionate about bringing the best stories to you. Our team of expert readers and writers handpick each book, condense it into an engaging and informative summary, and deliver it to you in a format that's easy to digest.
            </p>
            <p>
So, not only do you get access to the best books, but you also benefit from the expertise and passion of a team that's committed to making reading accessible and enjoyable for everyone. Join The Summary Hub today and be part of a community that values the power of storytelling and the magic of the written word.
            </p>
        </div>        
    </div>
  );
}

export default AboutPage;