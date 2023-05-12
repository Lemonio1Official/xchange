import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../store/store";

import s from "./ExForm.module.scss";
import { setDirection } from "../../../store/reducers/exchangeSlice";

interface IProps {
  props: {
    cc: { c: string; n: string[] }[];
    crypto: number;
    dir: "from" | "to";
  };
}

function ChooseCrypto({ props }: IProps) {
  const [currCrypto, setCurrCrypto] = useState<[string, string]>([props.cc[props.crypto].c, "BEP20"]);
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDirection([props.dir, currCrypto]));
  }, [currCrypto]);

  return (
    <div className={s.chooseCrypto}>
      <div className={s.current} onClick={() => setOpened(!opened)}>
        {currCrypto[0]}
        <span className={s.network}>{currCrypto[1]}</span>
        <i className={`fa-solid fa-angle-down ${opened && s.opened}`}></i>
      </div>
      <ul className={`${!opened && s.closed}`}>
        {props.cc.map((i, ind) => (
          <li key={ind}>
            {i.c}
            <div>
              {i.n.map((v, ind) => (
                <span
                  key={ind}
                  onClick={() => {
                    setCurrCrypto([i.c, v]);
                    setOpened(false);
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChooseCrypto;
