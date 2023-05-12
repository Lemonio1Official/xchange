import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setChecked } from "../../store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useState } from "react";

import { checkCookie, deleteCookie, getCookie } from "../../my/cookies";
import LvlDesc from "./LvlDesc";
import { url } from "../../url";
import Settings from "./Settings";
import s from "./Profile.module.scss";

function Profile() {
  const [settings, setSettings] = useState(false);
  const checked = useAppSelector((s) => s.userReducer.checked);
  const user = checkCookie("user") && JSON.parse(getCookie("user"));
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checked === false && nav("/signin");
  }, [checked]);

  return (
    <div className={s.profile}>
      {settings && <Settings setSettings={setSettings} user={user} />}
      <div className={s.welcome}>
        <div className={s.info}>
          <b className={s["lvl" + user.lvl]}>{user.lvl}</b>
          <span>
            {user.nickname}
            <p>{user.email}</p>
          </span>
          <div className={s.sett}>
            <i className="fa-solid fa-lock" onClick={() => setSettings(true)} />
          </div>
        </div>
        <div
          className={s.signout}
          onClick={() => {
            deleteCookie("user");
            dispatch(setChecked(false));
          }}
        >
          Sign out <i className="fa-solid fa-right-from-bracket" />
        </div>
      </div>
      <div className={s.stats}>
        <span>
          Number of referrals<p>{user.refs}</p>
        </span>
        <span>
          Trading volume<p>$ {user.exVolume}</p>
        </span>
        <span>
          Сurrent discount<p>{user.lvl * 10 + (user.ref ? 10 : 0)}%</p>
        </span>
      </div>
      <LvlDesc user={user} />
      <div className={s.refProgram}>
        <div className={s.title}>Referral program</div>
        <span className={s.refLink}>
          Your referral link
          <b
            onClick={(e) => {
              navigator.clipboard.writeText(e.currentTarget.innerText);
            }}
          >
            {url}signin/new/{user.id}
            <i className="fa-solid fa-clone" />
          </b>
        </span>
        <span className={s.cashback}>
          Cashback balance
          <b>
            $ 0 <i className="fa-solid fa-share-from-square" />
          </b>
        </span>
        <span className={s.info}>
          <i className="fa-solid fa-info" />
          <span>Get 10% commission on your referrals' exchanges</span>
        </span>
      </div>
    </div>
  );
}

export default Profile;
