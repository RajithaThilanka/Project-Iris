import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      {" "}
      <footer className="footer footer--mod">
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
            className="footer-logo-img"
          />
        </div>

        <div className="footer-container-mod">
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

          {/* <div className="col-1-of-2">
            <p className="footer__copyright" />
            Built by{" "}
            <a href="#" className="footer__link">
              IRIS Project
            </a>
            <tr />
            Copyright &copy;
          </div> */}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
