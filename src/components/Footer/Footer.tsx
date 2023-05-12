import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Header/logo.png";
import s from "./Footer.module.scss";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className={s.footer}>
      <div className={s.first}>
        <div>
          <img src={logo} alt="img" />
          xChange
        </div>
        <span>
          Multicurrency online exchange xChange. Change your Bitcoin, Ethereum, Solana, Tether and other crypto, only with a few
          clicks. However, the exchange is not limited to these directions.
          <br />
          <b>© 2021-2023 xChange</b>
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", flex: "1" }}>
        <div className={s.column}>
          <span>Menu</span>
          <Link to={"/"}>Main</Link>
          <Link to={"/about"}>About us</Link>
          <Link to={"/reviews"}>Reviews</Link>
          <Link to={"/help"}>Help</Link>
        </div>
        <div className={s.column}>
          <span>Documents</span>
          <Link to={"/terms"}>Terms of Service</Link>
          <Link to={"/privacy"}>Privacy Policy</Link>
          <Link to={"/profile"}>Referral program</Link>
          <p
            onClick={() => {
              if (location.pathname !== "/") navigate("/");
              document.scrollingElement?.scrollTo(0, 0);
            }}
          >
            Partnership
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
