import { useState } from "react";
import s from "./Profile.module.scss";

function LvlDesc({ user }: any) {
  const [lvl, setLvl] = useState(false);
  const [boost, setBoost] = useState(false);

  return (
    <div className={s.lvlDesc}>
      {user.nickname}, you are{" "}
      <b onMouseOver={() => setLvl(true)} onMouseLeave={() => setLvl(false)}>
        level {user.lvl}
      </b>{" "}
      .What is this level for and how to{" "}
      <b onMouseOver={() => setBoost(true)} onMouseLeave={() => setBoost(false)}>
        increase
      </b>{" "}
      it?
      <br />
      The higher the level, the greater the commission discount. The level can be increased gradually{" "}
      <i>(Hover over bold text to see details)</i>
      {lvl && (
        <ul>
          <li>level 1 – 10% discount</li>
          <li>level 2 – 20% discount</li>
          <li>level 3 – 30% discount</li>
          <li>
            Also, if you registered using a referral link, your discount will be more <b>from 10 to 20 percent!</b>
          </li>
        </ul>
      )}
      {boost && (
        <ul className={s.boost}>
          <li>level 1 – Complete registration</li>
          <li>level 2 – Your trading volume must be over $100</li>
          <li>level 3 – The trading volume of one of your referrals must be over $100</li>
          <li>So far, level 3 is max.</li>
        </ul>
      )}
    </div>
  );
}

export default LvlDesc;
