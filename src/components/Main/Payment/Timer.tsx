import { useEffect, useState } from "react";
import s from "./Payment.module.scss";
import { useAppDispatch } from "../../../store/store";
import { setPayment } from "../../../store/reducers/exchangeSlice";
import { checkCookie, deleteCookie } from "../../../my/cookies";
import { reset } from "../../../store/reducers/inputSlice";

function Timer() {
  const [count, setCount] = useState(300);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (count === 300) {
      const storeCount = localStorage.getItem("timerCount");
      if (storeCount) {
        setCount(Number(storeCount) - 1);
        return;
      }
    }
    setTimeout(() => {
      if (count > 0) {
        setCount((i) => i - 1);
        if (checkCookie("exchange")) localStorage.setItem("timerCount", (count - 1).toString());
      } else {
        dispatch(setPayment(""));
        localStorage.removeItem("timerCount");
        deleteCookie("exchange");
        dispatch(reset("exchange"));
      }
    }, 1000);
  }, [count]);

  return (
    <div className={s.timer}>
      <span
        onClick={() => {
          dispatch(setPayment(""));
          localStorage.removeItem("timerCount");
          deleteCookie("exchange");
          dispatch(reset("exchange"));
        }}
      >
        <i className={`fa-solid fa-circle-xmark ${s.cancel}`} />
      </span>
      <span className={s.time}>{count}</span>
    </div>
  );
}

export default Timer;
