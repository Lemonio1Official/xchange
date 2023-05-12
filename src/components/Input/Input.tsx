import { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { minMax, findSymbol, forbiddenSymbol } from "./revise";
import s from "./input.module.scss";

type rp = number | string | object;

interface IProps {
  fd: {
    name: string;
    type?: "password" | "checkbox" | "number" | "email";
    style?: CSSProperties;
    required?: 1;
    restore?: string[];
  };
  revise?: {
    minMax?: rp[];
    findSymbol?: rp[];
    forbiddenSymbol?: rp[];
  }[];
  bd?: {
    form: string;
    key: string;
    set: (o: any) => any;
    addErr: (o: any) => any;
  };
}

function Input({ fd, bd, revise }: IProps) {
  const [[value, setValue], [checked, setChecked]] = [useState(""), useState(false)];
  const [[err, setErr], [cboxErr, setCboxErr]] = [useState(""), useState(false)];
  const { submit, reset, counter } = useAppSelector((s) => s.inputReducer);
  const Value = useAppSelector((s: any) => {
    if (fd.restore) {
      const get = (key: string, object: any) => object[key];
      let currObj = s;
      for (let i = 0; i < fd.restore.length; i++) {
        if (i === fd.restore.length) break;
        currObj = get(fd.restore[i], currObj);
      }
      return currObj;
    }
  });

  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    Value && setValue(Value);
  }, [Value]);

  useEffect(() => {
    if (Array.isArray(revise) && submit === bd?.form) {
      const e = { err: "" };
      revise!.map((i) => {
        if (!e.err)
          Object.keys(i).map((v) => {
            if (v === "minMax" || v === "findSymbol" || v === "forbiddenSymbol") {
              const a = i[v]!;
              v === "minMax" && typeof a[0] === "number" && typeof a[1] === "number" && (e.err = minMax(a[0], a[1], value));
              v === "findSymbol" && typeof a[0] === "string" && typeof a[1] === "number" && (e.err = findSymbol(a[0], a[1], value));
              v === "forbiddenSymbol" && Array.isArray(a[0]) && (e.err = forbiddenSymbol(a[0], value));
            }
          });
      });
      setErr(e.err);
      dispatch(bd!.addErr(e.err));
    }
    if (submit && fd.type === "checkbox") {
      if (fd.required) {
        setCboxErr(!checked);
        checked ? dispatch(bd!.addErr("")) : dispatch(bd!.addErr("false"));
      } else dispatch(bd!.addErr(""));
    }
  }, [submit, counter]);

  useEffect(() => {
    if (bd?.form === reset) {
      setValue("");
      setChecked(false);
    }
  }, [reset]);

  return (
    <div className={`${s.input} ${fd.type === "checkbox" && s.checkbox} ${err && s.error} ${cboxErr && s.cerr}`} style={fd.style}>
      <label>
        <span>{fd.name}</span>
        <input
          type={fd.type ? (fd.type === "password" ? (show ? "text" : fd.type) : fd.type) : "text"}
          value={value}
          checked={checked}
          onChange={(e) => {
            setValue(e.target.value);
            if (fd.type === "checkbox") {
              setChecked(!checked);
              if (bd?.set) dispatch(bd?.set([bd.key, !checked]));
            }
          }}
          onBlur={() => {
            if (bd?.set) dispatch(bd?.set([bd.key, fd.type === "number" ? Number(value) : value]));
          }}
        />
        {fd.type === "password" && (
          <i className={`fa-solid fa-eye${!show ? "-slash" : ""} ${s.eye}`} onClick={() => setShow(!show)}></i>
        )}
      </label>
      <span className={s.textErr}>{err}</span>
    </div>
  );
}

export default Input;
