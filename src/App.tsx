import { Routes, Route, Link } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";

import { checkCookie } from "./my/cookies";
import { setChecked, verification } from "./store/reducers/userSlice";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Main from "./components/Main/Main";
import SignIn from "./components/SignIn/SignIn";
import About from "./components/About/About";
import Reviews from "./components/Reviews/Reviews";

import s from "./app.module.scss";
import Help from "./components/Help/Help";
import Footer from "./components/Footer/Footer";
import Privacy from "./components/Privacy/Privacy";
import TermsOS from "./components/TermsOS/TermsOS";
import Admin from "./components/Admin/Admin";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkCookie("user")) dispatch(verification());
    else dispatch(setChecked(false));
  }, []);

  return (
    <div className={s.app}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signin/new?/:id?" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<TermsOS />} />
                <Route
                  path="*"
                  element={
                    <div className={s.err404}>
                      <span>
                        404 Not Found <Link to="/">Go to Main page</Link>
                      </span>
                    </div>
                  }
                />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
