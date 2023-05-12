import { checkCookie, deleteCookie, getCookie } from "../../../my/cookies";
import { setPayment } from "../../../store/reducers/exchangeSlice";
import { reset } from "../../../store/reducers/inputSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { url } from "../../../url";
import s from "./Payment.module.scss";

function Payment() {
  const payment = useAppSelector((s) => s.exchangeReducer.payment);
  const user = checkCookie("user") ? JSON.parse(getCookie("user")) : {};
  const ex = checkCookie("exchange") ? JSON.parse(getCookie("exchange")) : {};
  const dispatch = useAppDispatch();
  const discount = checkCookie("user") ? user.lvl * 0.1 + (user.ref ? 0.1 : 0) : 0;

  return (
    <div className={s.payment}>
      {payment === "pending" ? (
        <>
          <div className={s.wrapper}>
            <div className={s.userInfo}>
              <p>
                <span>Email</span>
                <s>{ex.email}</s>
              </p>
              <p>
                <span>Name</span>
                <s>{ex.name}</s>
              </p>
              <p>
                <span>Wallet</span>
                <s>{ex.wallet}</s>
              </p>
              <p>
                <span>Сurrency pair</span>
                <s>
                  {ex.couple.split("_")[0]}
                  <b>{ex.networks.split("_")[0]}</b> _ {ex.couple.split("_")[1]}
                  <b>{ex.networks.split("_")[1]}</b>
                </s>
              </p>
              <p>
                <span>Amount Receivable</span>
                <s>{ex.toNumber + " " + ex.couple.split("_")[1]}</s>
              </p>
              <p>
                <span>Exchange rate</span>
                <s>{ex.course + " " + ex.couple.split("_")[1] + " ~ 1 " + ex.couple.split("_")[0]}</s>
              </p>
            </div>
            <div className={s.payDetails}>
              <p>
                <span>Order ID</span>
                <s>#{ex.id}</s>
              </p>
              <p>
                <span>Amount payable</span>
                <s>
                  {Number((ex.fromNumber + ex.fromNumber * 0.005 * (1 - discount)).toFixed(8))} {ex.couple.split("_")[0]}
                </s>
              </p>
              <p className={s.warning}>
                <i className="fa-solid fa-triangle-exclamation" />
                You must pay this amount, no more, no less.
              </p>
              <p>
                <span>Exchange volume</span>
                <s>{ex.exVolume} USD</s>
              </p>
              <div className={s.paymentDetails}>
                <span>Payment address</span>
                <b
                  onClick={() => {
                    navigator.clipboard.writeText(ex.details);
                  }}
                >
                  <s>{ex.details}</s>
                  <i className="fa-solid fa-clone" />
                </b>
              </div>
            </div>
          </div>
          <button
            className={s.paidBtn}
            onClick={() => {
              fetch(`${url}api/order/${ex.id}`);
              localStorage.removeItem("timerCount");
              deleteCookie("exchange");
              dispatch(setPayment("success"));
            }}
          >
            I PAID
          </button>
        </>
      ) : (
        payment === "success" && (
          <div className={s.paid}>
            <span>
              <i className="fa-solid fa-circle-check" />
              Thank you for the exchange, please wait for a letter of success!
            </span>
            <button
              onClick={() => {
                dispatch(setPayment(""));
                dispatch(reset("exchange"));
              }}
            >
              To MAIN
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Payment;
