import { Link } from "react-router-dom";

import logo from "./logo.png";
import s from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetData } from "../../store/reducers/userSlice";

function Header() {
  const checked = useAppSelector((s) => s.userReducer.checked);
  const dispatch = useAppDispatch();

  return (
    <header className={s.header}>
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="logo" />
            xChange
          </Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          {checked !== "" &&
            (checked ? (
              <Link to="/profile" className={s.user}>
                <i className="fa-solid fa-user-large"></i>
              </Link>
            ) : (
              <Link to="/signin" onClick={() => dispatch(resetData())}>
                SIGN IN
              </Link>
            ))}
        </li>
      </ul>
    </header>
  );
}

export default Header;
