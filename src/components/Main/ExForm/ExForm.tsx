import { useRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";

import Input from "../../Input/Input";
import ChooseCrypto from "./ChoseCrypto";
import { setForm, set, addErr, setRequest, newOrder } from "../../../store/reducers/exchangeSlice";
import { reset, submit } from "../../../store/reducers/inputSlice";
import s from "./ExForm.module.scss";

const cc = [
  { c: "BTC", n: ["BTC", "BEP20"] },
  { c: "ETH", n: ["ERC20", "BEP20"] },
  { c: "BNB", n: ["BEP20"] },
  { c: "SOL", n: ["SOL", "BEP20"] },
  { c: "NEAR", n: ["NEAR", "BEP20"] },
  { c: "WAVES", n: ["WAVES", "BEP20"] },
  { c: "USDT", n: ["TRC20", "BEP20"] },
  { c: "USDC", n: ["TRC20", "BEP20"] },
];

function ExForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { validity, request, backErr } = useAppSelector((s) => s.exchangeReducer.back);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formRef.current) dispatch(setForm(formRef.current.innerHTML));
  }, []);
  useEffect(() => {
    if (request !== "pending") {
      setLoading(false);
      dispatch(setRequest([null, ""]));
    }
  }, [request]);
  useEffect(() => {
    if (validity) {
      setLoading(true);
      dispatch(newOrder());
    }
  }, [validity]);

  return (
    <form className={s.exform} ref={formRef} onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
      {loading && (
        <div className={s.loading}>
          <i className="fa-solid fa-spinner" />
        </div>
      )}
      <div className={s.column}>
        <ChooseCrypto props={{ cc, crypto: 1, dir: "from" }} />
        <Input
          fd={{ name: "You Give", type: "number", restore: ["exchangeReducer", "fields", "fromNumber"] }}
          bd={{ key: "fromNumber", set, addErr, form: "exchange" }}
          revise={[{ forbiddenSymbol: ["e"] }]}
        />
        <ChooseCrypto props={{ cc, crypto: 6, dir: "to" }} />
        <Input
          fd={{ name: "You Get", type: "number", restore: ["exchangeReducer", "fields", "toNumber"] }}
          bd={{ key: "toNumber", set, addErr, form: "exchange" }}
          revise={[{ forbiddenSymbol: ["e"] }]}
        />
      </div>
      <div className={s.column}>
        <Input
          fd={{ name: "Email" }}
          bd={{ key: "email", set, addErr, form: "exchange" }}
          revise={[{ minMax: [8, 255] }, { findSymbol: ["@", 1] }, { forbiddenSymbol: [["+"]] }]}
        />
        <Input fd={{ name: "Name" }} bd={{ key: "name", set, addErr, form: "exchange" }} revise={[{ minMax: [4, 15] }]} />
        <Input fd={{ name: "Wallet" }} bd={{ key: "wallet", set, addErr, form: "exchange" }} revise={[{ minMax: [4, 240] }]} />
        <button
          className={s.continue}
          onClick={(e) => {
            e.preventDefault();
            dispatch(submit("exchange"));
          }}
        >
          Continue
        </button>
      </div>
      <div className={s.backErr}>{backErr && <span>{backErr}</span>}</div>
    </form>
  );
}

export default ExForm;
