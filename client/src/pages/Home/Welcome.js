
import './Welcome.css';

function Welcome() {
  return (
    <div>
    <div className="navigation">
        <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

        <label for="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
            <ul className="navigation__list">
                <li className="navigation__item"><a href="#" className="navigation__link"><span>01</span>About Natous</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link"><span>02</span>Your benfits</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link"><span>03</span>Popular tours</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link"><span>04</span>Stories</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link"><span>05</span>Book now</a></li>
                </ul>
        </nav>
    </div>

    <header className="header">
        <div className="header__logo-box">
            <img src="img/logo-white.png" alt="Logo" className="header__logo"/>
        </div>

        <div className="header__text-box">
            <h1 className="heading-primary">
                <span className="heading-primary--main">Outdoors</span>
                <span className="heading-primary--sub">is where life happens</span>
            </h1>

            <a href="#section-tours" className="btn btn--white btn--animated">Discover our tours</a>
        </div>
    </header>

    <main/>
        <section className="section-about">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Exciting tours for adventurous people
                </h2>
            </div>

            <div className="row">
                <div className="col-1-of-2">
                    <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                        ducimus quam nisi exercitationem omnis earum qui.
                    </p>

                    <h3 className="heading-tertiary u-margin-bottom-small">Live adventures like you never have before</h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla deserunt voluptatum nam.
                    </p>

                    <a href="#" className="btn-text">Learn more &rarr;</a>
                </div>
                <div className="col-1-of-2">
                    <div className="composition">

                        <img srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
                             sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                             alt="Photo 1"
                             className="composition__photo composition__photo--p1"
                             src="img/nat-1-large.jpg"/>

                        <img srcset="img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w"
                             sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                             alt="Photo 2"
                             className="composition__photo composition__photo--p2"
                             src="img/nat-2-large.jpg"/>

                        <img srcset="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                             sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                             alt="Photo 3"
                             className="composition__photo composition__photo--p3"
                             src="img/nat-3-large.jpg"/>


                    </div>
                </div>
            </div>
          </section>
       

        <section className="section-features">
            
            <div className="row">
                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-world"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Explore the world</h3>
                        <p className="feature-box__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-compass"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Meet nature</h3>
                        <p className="feature-box__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-map"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Find your way</h3>
                         <p className="feature-box__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                        </p>
                    </div>
                </div>

                <div className="col-1-of-4">
                    <div className="feature-box">
                        <i className="feature-box__icon icon-basic-heart"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Live a healthier life</h3>
                        <p className="feature-box__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="section-tours" id="section-tours">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Most popular tours
                </h2>
            </div>

            <div className="row">
                <div className="col-1-of-3">
                   <div className="card">
                       <div className="card__side card__side--front">
                            <div className="card__picture card__picture--1">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--1">The Sea Explorer</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>3 day tours</li>
                                    <li>Up to 30 people</li>
                                    <li>2 tour guides</li>
                                    <li>Sleep in cozy hotels</li>
                                    <li>Difficulty: easy</li>
                                </ul>
                            </div>
                       </div>
                       <div className="card__side card__side--back card__side--back-1">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Only</p>
                                    <p className="card__price-value">$297</p>
                                </div>
                                <a href="#popup" className="btn btn--white">Book now!</a>
                            </div>
                        </div>
                   </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture card__picture--2">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--2">The Forest Hiker</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>7 day tours</li>
                                    <li>Up to 40 people</li>
                                    <li>6 tour guides</li>
                                    <li>Sleep in provided tents</li>
                                    <li>Difficulty: medium</li>
                                </ul>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-2">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Only</p>
                                    <p className="card__price-value">$497</p>
                                </div>
                                <a href="#popup" className="btn btn--white">Book now!</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture card__picture--3">
                                &nbsp;
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--3">The Snow Adventurer</span>
                            </h4>
                            <div className="card__details">
                                <ul>
                                    <li>5 day tours</li>
                                    <li>Up to 15 people</li>
                                    <li>3 tour guides</li>
                                    <li>Sleep in provided tents</li>
                                    <li>Difficulty: hard</li>
                                </ul>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-3">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Only</p>
                                    <p className="card__price-value">$897</p>
                                </div>
                                <a href="#popup" className="btn btn--white">Book now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
                <a href="#" className="btn btn--green">Discover all tours</a>
            </div>
        </section>

        <section className="section-stories"/>
            <div className="bg-video">
                <video className="bg-video__content" autoplay muted loop/>
                    <source src="img/video.mp4" type="video/mp4"/>
                    <source src="img/video.webm" type="video/webm"/>
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
                        <img src="img/nat-8.jpg" alt="Person on a tour" className="story__img"/>
                        <figcaption className="story__caption">Mary Smith</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading-tertiary u-margin-bottom-small">I had the best week ever with my family</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                            repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="story">
                    <figure className="story__shape">
                        <img src="img/nat-9.jpg" alt="Person on a tour" className="story__img"/>
                        <figcaption className="story__caption">Jack Wilson</figcaption>
                    </figure>
                    <div className="story__text">
                        <h3 className="heading-tertiary u-margin-bottom-small">WOW! My life is completely different now</h3>
                        <p/>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur libero repellat quis consequatur
                            ducimus quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente aspernatur libero
                            repellat quis consequatur ducimus quam nisi exercitationem omnis earum qui.
                        {/* </p> */}
                    </div>
                </div>
            </div>

            <div className="u-center-text u-margin-top-huge">
                <a href="#" className="btn-text">Read all stories &rarr;</a>
            </div>
        {/* </section> */}

        <section className="section-book">
            <div className="row">
                <div className="book">
                    <div className="book__form">
                        <form action="#" className="form">
                            <div className="u-margin-bottom-medium">
                                <h2 className="heading-secondary">
                                    Start booking now
                                </h2>
                            </div>

                            <div className="form__group">
                                <input type="text" className="form__input" placeholder="Full name" id="name" required/>
                                <label for="name" className="form__label">Full name</label>
                            </div>

                            <div className="form__group">
                                <input type="email" className="form__input" placeholder="Email address" id="email" required/>
                                <label for="email" className="form__label">Email address</label>
                            </div>

                            <div className="form__group u-margin-bottom-medium">
                                <div className="form__radio-group">
                                    <input type="radio" className="form__radio-input" id="small" name="size"/>
                                    <label for="small" className="form__radio-label">
                                        <span className="form__radio-button"></span>
                                        Small tour group
                                    </label>
                                </div>

                                <div className="form__radio-group">
                                    <input type="radio" className="form__radio-input" id="large" name="size"/>
                                    <label for="large" className="form__radio-label">
                                        <span className="form__radio-button"></span>
                                        Large tour group
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
    {/* </main> */}

    <footer className="footer"/>
        <div className="footer__logo-box">

            <picture className="footer__logo"/>
                <source srcset="img/logo-green-small-1x.png 1x, img/logo-green-small-2x.png 2x"
                        media="(max-width: 37.5em)"/>
                <img srcset="img/logo-green-1x.png 1x, img/logo-green-2x.png 2x" alt="Full logo" src="img/logo-green-2x.png"/>
            


            
        </div>
        <div className="row">
            <div className="col-1-of-2">
                <div className="footer__navigation">
                    <ul className="footer__list">
                        <li className="footer__item"><a href="#" className="footer__link">Company</a></li>
                        <li className="footer__item"><a href="#" className="footer__link">Contact us</a></li>
                        <li className="footer__item"><a href="#" className="footer__link">Carrers</a></li>
                        <li className="footer__item"><a href="#" className="footer__link">Privacy policy</a></li>
                        <li className="footer__item"><a href="#" className="footer__link">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-1-of-2">
                <p className="footer__copyright"/>
                    Built by <a href="#" className="footer__link">Jonas Schmedtmann</a> for his online course <a href="#" className="footer__link">Advanced CSS and Sass</a>.
                    Copyright &copy; by Jonas Schmedtmann. You are 100% allowed to use this webpage for both personal
                    and commercial use, but NOT to claim it as your own design. A credit to the original author, Jonas
                    Schmedtmann, is of course highly appreciated!
                
            </div>
        </div>
    {/* </footer> */}

    <div className="popup" id="popup">
        <div className="popup__content">
            <div className="popup__left">
                <img src="img/nat-8.jpg" alt="Tour photo" className="popup__img"/>
                <img src="img/nat-9.jpg" alt="Tour photo" className="popup__img"/>
            </div>
            <div className="popup__right">
                <a href="#section-tours" className="popup__close">&times;</a>
                <h2 className="heading-secondary u-margin-bottom-small">Start booking now</h2>
                <h3 className="heading-tertiary u-margin-bottom-small">Important &ndash; Please read these terms before booking</h3>
                <p className="popup__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Sed sed risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio facilisis mauris sit
                    amet massa vitae. Mi bibendum neque egestas congue. Placerat orci nulla pellentesque dignissim enim
                    sit. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit eget
                    gravida cum sociis natoque penatibus et. Proin fermentum leo vel orci porta non pulvinar neque laoreet.
                    Gravida neque convallis a cras semper. Molestie at elementum eu facilisis sed odio morbi quis. Faucibus
                    vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero justo laoreet sit. Amet massa
                    vitae tortor condimentum lacinia quis vel eros donec. Sit amet facilisis magna etiam. Imperdiet sed
                    euismod nisi porta.
                </p>
                <a href="#" className="btn btn--green">Book now</a>
            </div>
        </div>
    </div>

  

</div>
  );
}

export default Welcome;
