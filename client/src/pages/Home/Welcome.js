import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import "./Welcome.css";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
function Welcome() {
  const [navOpen, setNavOpen] = useState(false);
  const features = useRef();

  const handleClick = () => {
    features.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />

        <label
          for="navi-toggle"
          className="navigation__button"
          onClick={() => setNavOpen(true)}
        >
          <span className="navigation__icon">&nbsp;</span>
        </label>
        {navOpen ? <Navigation /> : <></>}
      </div>

      <header className="header">
        <div className="header__logo-box">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={serverPublic + "irislogo.png"}
              alt="Logo"
              className="header__logo"
            />
            <span className="logo-content">IRIS</span>
          </div>
          <Link
            to="/auth/login"
            className="btn btn--white btn--animated btn-login"
            replace={false}
          >
            Login
          </Link>
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Soulmate</span>
            <span className="heading-primary--sub">is waiting for you</span>
          </h1>

          <Link
            to="/auth/signup/account-info"
            className="btn btn--white btn--animated"
            replace={false}
          >
            Join Now
          </Link>
        </div>
      </header>

      <main>
        <section className="section-about">
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">A new Iris experience</h2>
          </div>

          <div className="row">
            <div className="col-1-of-2">
              <h3 className="heading-tertiary u-margin-bottom-small">
                Best Matching Algorithm
              </h3>
              <p className="paragraph">
                We suggest you the best fit person on our platform for a long
                lasting relationship with having better privacy.
              </p>

              <h3 className="heading-tertiary u-margin-bottom-small">
                Matching with greatest accuracy
              </h3>
              <p className="paragraph">
                AI algorithm gives the best fit compared to other matching
                platforms
              </p>

              <span href="#" className="btn-text" onClick={handleClick}>
                Learn more &rarr;
              </span>
            </div>
            <div className="col-1-of-2">
              <div className="composition">
                <img
                  srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
                  sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                  alt="Photo 1"
                  className="composition__photo composition__photo--p1"
                  src="img/nat-1-large.jpg"
                />

                <img
                  srcset="img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w"
                  sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                  alt="Photo 2"
                  className="composition__photo composition__photo--p2"
                  src="img/nat-2-large.jpg"
                />

                <img
                  srcset="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                  sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                  alt="Photo 3"
                  className="composition__photo composition__photo--p3"
                  src="img/nat-3-large.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-features" ref={features}>
          <div className="row">
            <div className="col-1-of-4">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-world"></i>
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Less Fake Accounts
                </h3>
                <p className="feature-box__text">
                  Accounts should be verified within few months
                </p>
              </div>
            </div>

            <div className="col-1-of-4">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-compass"></i>
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Virtual Dates
                </h3>
                <p className="feature-box__text">
                  You can make virutal dates with connected friends
                </p>
              </div>
            </div>

            <div className="col-1-of-4">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-map"></i>
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Acurate Matching
                </h3>
                <p className="feature-box__text">
                  Matching is done based on your personal interests and
                  characteristics
                </p>
              </div>
            </div>

            <div className="col-1-of-4">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-heart"></i>
                <h3 className="heading-tertiary u-margin-bottom-small">
                  High Security
                </h3>
                <p className="feature-box__text">
                  High protection for Private details
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-tours" id="section-tours">
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Most popular features</h2>
          </div>

          <div className="row">
            <div className="col-1-of-3">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--1">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--1">
                      Virtual Dates
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>Schedule A Date</li>
                      <li>Virtual Effects</li>
                      <li>Video Call</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-1">
                  <div className="card__cta">
                    <div className="card__price-box">
                      <p className="card__price-only">Register</p>
                      <p className="card__price-value">Free</p>
                    </div>
                    <Link
                      to="/auth/signup/account-info"
                      className="btn btn--white"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--2">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--2">
                      Make Connections
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>Make new connections</li>
                      <li>Remove connections</li>
                      <li>Meet new friends</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-2">
                  <div className="card__cta">
                    <div className="card__price-box">
                      <p className="card__price-only">Register</p>
                      <p className="card__price-value">Free</p>
                    </div>
                    <Link
                      to="/auth/signup/account-info"
                      className="btn btn--white"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--3">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--3">
                      Private Chat
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>hate speech detection</li>
                      <li>report users</li>
                      <li> block users</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-3">
                  <div className="card__cta">
                    <div className="card__price-box">
                      <p className="card__price-only">Register</p>
                      <p className="card__price-value">Free</p>
                    </div>
                    <Link
                      to="/auth/signup/account-info"
                      className="btn btn--white"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="u-center-text u-margin-top-huge">
            <Link to="/auth/signup/account-info" className="btn btn--green">
              Create an Account
            </Link>
          </div>
        </section>

        <section className="section-stories">
          <div className="bg-video">
            <video className="bg-video__content" autoplay muted loop />
            <source src="img/video.mp4" type="video/mp4" />
            <source src="img/video.webm" type="video/webm" />
            Your browser is not supported!
          </div>

          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">
              We make people genuinely happy
            </h2>
          </div>

          <div className="row">
            <div className="story">
              <figure className="story__shape">
                <img
                  src="img/nat-8.jpg"
                  alt="Person on a tour"
                  className="story__img"
                />
                <figcaption className="story__caption">Mary Smith</figcaption>
              </figure>
              <div className="story__text">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  I Founded my soulmate from IRIS
                </h3>
                <p>
                  To be fully transparent, when I first heard “Elite Singles”, I
                  thought it was going to be some private meeting of a bunch of
                  snobby socialites who were “too good and too elite for the
                  rest of the world”. Thankfully, my parents taught me to never
                  judge a book by it cover because that is not the case.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="story">
              <figure className="story__shape">
                <img
                  src="img/nat-9.jpg"
                  alt="Person on a tour"
                  className="story__img"
                />
                <figcaption className="story__caption">Jack Wilson</figcaption>
              </figure>
              <div className="story__text">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  WOW! My life is completely different now
                </h3>
                <p>
                  To be fully transparent, when I first heard “Elite Singles”, I
                  thought it was going to be some private meeting of a bunch of
                  snobby socialites who were “too good and too elite for the
                  rest of the world”. Thankfully, my parents taught me to never
                  judge a book by it cover because that is not the case.
                </p>
              </div>
            </div>
          </div>

          <div className="u-center-text u-margin-top-huge">
            <a href="#" className="btn-text">
              Read all stories &rarr;
            </a>
          </div>
        </section>

        <section className="section-book">
          <div className="row">
            <div className="book">
              <div className="book__form">
                <form action="#" className="form">
                  <div className="u-margin-bottom-medium">
                    <h2 className="heading-secondary">Join With Us</h2>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Full name"
                      id="name"
                      required
                    />
                    <label for="name" className="form__label">
                      Full name
                    </label>
                  </div>

                  <div className="form__group">
                    <input
                      type="email"
                      className="form__input"
                      placeholder="Email address"
                      id="email"
                      required
                    />
                    <label for="email" className="form__label">
                      Email address
                    </label>
                  </div>

                  <div className="form__group u-margin-bottom-medium">
                    <div className="form__radio-group">
                      <input
                        type="radio"
                        className="form__radio-input"
                        id="small"
                        name="size"
                      />
                      <label for="small" className="form__radio-label">
                        <span className="form__radio-button"></span>i am a man
                      </label>
                    </div>

                    <div className="form__radio-group">
                      <input
                        type="radio"
                        className="form__radio-input"
                        id="large"
                        name="size"
                      />
                      <label for="large" className="form__radio-label">
                        <span className="form__radio-button"></span>i am a woman
                      </label>
                    </div>
                  </div>

                  <div className="form__group">
                    <button className="btn btn--green">Next step &rarr;</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__logo-box">
          <picture className="footer__logo" />
          <source
            srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x"
            media="(max-width: 37.5em)"
          />
          <img
            srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x"
            alt="Full logo"
            src="img/logo-green-2x.png"
          />
        </div>
        <div className="row">
          <div className="col-1-of-2">
            <div className="footer__navigation">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Contact us
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    About Us
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Privacy policy
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-1-of-2">
            <p className="footer__copyright" />
            Built by{" "}
            <a href="#" className="footer__link">
              IRIS Project
            </a>
            <tr />
            Copyright &copy;
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
