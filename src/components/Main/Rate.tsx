import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setCourse } from "../../store/reducers/exchangeSlice";

import s from "./Main.module.scss";

function Rate() {
  const [from, to] = useAppSelector((s) => [s.exchangeReducer.from.name, s.exchangeReducer.to.name]);
  const course = useAppSelector((s) => s.exchangeReducer.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (from[0] === "USDT" || from[0] === "USDC") {
      dispatch(setCourse(["from", 1]));
      return;
    }
    from[0] &&
      fetch(`https://www.binance.com/api/v1/depth?limit=500&symbol=${from[0]}USDT`)
        .then((res) => res.json())
        .then((price) => {
          let rate = Number(price.bids[0][0]);
          if (from[0] === "SOL" || from[0] === "NEAR") rate = rate * 0.986;
          dispatch(setCourse(["from", rate]));
        });
  }, [from]);
  useEffect(() => {
    if (to[0] === "USDT" || to[0] === "USDC") {
      dispatch(setCourse(["to", 1]));
      return;
    }
    to[0] &&
      fetch(`https://www.binance.com/api/v1/depth?limit=500&symbol=${to[0]}USDT`)
        .then((res) => res.json())
        .then((price) => {
          let rate = Number(price.bids[0][0]);
          if (to[0] === "SOL" || to[0] === "NEAR") rate = rate * 0.986;
          dispatch(setCourse(["to", rate]));
        });
  }, [to]);
  useEffect(() => {
    const id = setInterval(() => {
      if (from[0] !== "USDT" && from[0] !== "USDC" && from[0]) {
        fetch(`https://www.binance.com/api/v1/depth?limit=500&symbol=${from[0]}USDT`)
          .then((res) => res.json())
          .then((price) => {
            let rate = Number(price.bids[0][0]);
            if (from[0] === "SOL" || from[0] === "NEAR") rate = rate * 0.986;
            dispatch(setCourse(["from", rate]));
          });
      }
      if (to[0] !== "USDT" && to[0] !== "USDC" && to[0])
        fetch(`https://www.binance.com/api/v1/depth?limit=500&symbol=${to[0]}USDT`)
          .then((res) => res.json())
          .then((price) => {
            let rate = Number(price.bids[0][0]);
            if (to[0] === "SOL" || to[0] === "NEAR") rate = rate * 0.986;
            dispatch(setCourse(["to", rate]));
          });
    }, 30000);
    return () => {
      clearInterval(id);
    };
  }, [from, to]);

  return (
    <div className={s.rate}>
      <span>Rate</span>
      <p>
        {course} <s>{to[0]}</s> ~ 1 <s>{from[0]}</s>
      </p>
    </div>
  );
}

export default Rate;
