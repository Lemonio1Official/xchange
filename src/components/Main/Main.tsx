import { Link } from "react-router-dom";

import ExForm from "./ExForm/ExForm";
import Rate from "./Rate";
import s from "./Main.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Payment from "./Payment/Payment";
import Timer from "./Payment/Timer";
import { useEffect } from "react";
import { checkCookie } from "../../my/cookies";
import { setPayment } from "../../store/reducers/exchangeSlice";

const banners = [
  {
    href: "https://www.bestchange.com/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/BestChange.png/1200px-BestChange.png",
  },
  {
    href: "https://bits.media/exchanger/xchange/",
    src: "https://forum.bits.media/uploads/monthly_2017_10/logo_bits.media_s.png.63c66d89ed24f0087a5dc1a84a44af7d.png",
  },
  { href: "https://exchangesumo.com/", src: "https://b.exchangesumo.com/i/1.svg" },
];

function Main() {
  const payment = useAppSelector((s) => s.exchangeReducer.payment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkCookie("exchange") && dispatch(setPayment("pending"));
  }, []);

  return (
    <div className={s.main}>
      <div className={s.banners}>
        {banners.map((i, ind) => (
          <a href={i.href} key={ind}>
            <img src={i.src} alt="BTC, ETH, PM, PayPal exchange rates" height="64px" />
          </a>
        ))}
      </div>
      <div className={s.form}>
        <div className={s.formTop}>
          <div className={s.tfd}>
            <span>Terms for the direction</span>
            <p>The exchange will be confirmed after receiving the 20 confirmations.</p>
            <p>
              Service fee: 0.5%. Rates from <a>CoinMarketCap</a>
            </p>
            <p>Exchange range: MIN $10; MAX $5000</p>
          </div>
          {payment === "" ? <Rate /> : payment === "pending" && <Timer />}
        </div>
        {payment === "" ? (
          <>
            <ExForm />
            <p className={s.agreement}>
              <i className="fa-solid fa-check" /> By clicking the «Continue» button you confirm your agreement with the our{" "}
              <Link to="/terms">Terms of Service</Link>
            </p>
          </>
        ) : (
          <Payment />
        )}
      </div>
    </div>
  );
}

export default Main;
