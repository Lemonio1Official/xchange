import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";

import Input from "../Input/Input";
import { set, setForm, addErr, resetData, signUser, setRequest } from "../../store/reducers/userSlice";
import s from "./SignIn.module.scss";
import { submit, reset } from "../../store/reducers/inputSlice";

function SignIn() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const newAcc = useLocation().pathname.indexOf("signin/new") > -1;
  const nav = useNavigate();
  const checked = useAppSelector((s) => s.userReducer.checked);
  const { validity, request, authorized, backErr } = useAppSelector((s) => s.userReducer.back);
  const refID = useParams().id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    checked && nav("/profile");
  }, [checked]);
  useEffect(() => {
    if (formRef.current) {
      if (refID) dispatch(set(["refid", refID]));
      dispatch(setForm(formRef.current.innerHTML));
    }
  }, [newAcc]);
  useEffect(() => {
    if (request !== "pending") {
      setLoading(false);
      dispatch(setRequest([null, ""]));
    }
  }, [request]);
  useEffect(() => {
    if (validity) {
      setLoading(true);
      dispatch(signUser());
    }
  }, [validity]);
  useEffect(() => {
    if (!authorized) return;
    setLoading(false);
    dispatch(reset("user"));
  }, [authorized]);

  return (
    <form className={s.signin} ref={formRef} onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
      {loading && (
        <div className={s.loading}>
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}
      <p className={s.title}>{newAcc ? "Create a new account" : "Login to your account"}</p>
      <Input
        fd={{ name: "Email", type: "email", style: { margin: "24px 0" } }}
        bd={{ key: "email", set, form: "user", addErr }}
        revise={[{ minMax: [8, 255] }, { findSymbol: ["@", 1] }, { forbiddenSymbol: [["+"]] }]}
      />
      {newAcc && (
        <Input
          fd={{ name: "Nickname", style: { margin: "24px 0" } }}
          bd={{ key: "nickname", set, form: "user", addErr }}
          revise={[{ minMax: [4, 15] }]}
        />
      )}
      <Input
        fd={{ name: "Password", type: "password", style: { margin: "24px 0" } }}
        bd={{ key: "password", set, form: "user", addErr }}
        revise={[{ minMax: [4, 99] }]}
      />
      {backErr && <span className={s.backErr}>{backErr}</span>}
      <button
        className={s.submit}
        onClick={(e) => {
          e.preventDefault();
          dispatch(submit("user"));
        }}
      >
        {newAcc ? "Sumbit" : "Login"}
      </button>
      <div className={s.actions}>
        <Link onClick={() => dispatch(resetData())} to={newAcc ? "/signin" : "/signin/new"}>
          {newAcc ? "Already have an account?" : "Don't have an account yet?"}
        </Link>
        {!newAcc && <Link to="/signin/forgotpass">Forgot password?</Link>}
      </div>
    </form>
  );
}

export default SignIn;
