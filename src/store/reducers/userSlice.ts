import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import istyle from "../../components/Input/input.module.scss";
import type { rootState } from "../store";
import { deleteCookie, getCookie, setCookie } from "../../my/cookies";
import { url } from "../../url";

interface IUser {
  fields: fields;
  inpsLen: number;
  errArr: string[];
  checked: boolean | "";
  back: {
    validity: boolean;
    request: "" | "rejected" | "pending";
    backErr: string;
    authorized: boolean;
  };
}

type fields = {
  email: string;
  nickname: string;
  password: string;
  refid: string;
};

const initialState: IUser = {
  fields: {
    email: "",
    nickname: "",
    password: "",
    refid: "",
  },
  inpsLen: 0,
  errArr: [],
  checked: "",
  back: {
    validity: false,
    request: "",
    backErr: "",
    authorized: false,
  },
};

export const signUser = createAsyncThunk("user/signUser", async (_, { dispatch, getState }) => {
  const { email, nickname, password, refid } = (getState() as rootState).userReducer.fields;
  try {
    dispatch(setRequest([null, "pending"]));
    const res = await fetch(url + "api/signin/0", {
      method: "POST",
      body: JSON.stringify({ email, nickname, password, refid }),
    });
    const json = await res.json();
    dispatch(setRequest([json, ""]));
  } catch (e) {
    console.log(e);
    console.log("404 NOT FOUND");
    dispatch(setRequest([null, "rejected"]));
  }
});

export const verification = createAsyncThunk("user/verification", async (_, { dispatch }) => {
  try {
    const { id, hash } = JSON.parse(getCookie("user"));
    const res = await fetch(url + "api/signin/1", {
      method: "POST",
      body: JSON.stringify({ id, hash }),
    });
    const json = await res.json();
    if (!json.ok) {
      dispatch(setChecked(false));
      deleteCookie("user");
    } else {
      setCookie("user", JSON.stringify(json.response), 7);
      dispatch(setChecked(true));
    }
  } catch (e) {
    console.log(e);
    console.log("404 NOT FOUND");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (s, { payload }: { payload: [keyof fields, string] }) => {
      s.fields[payload[0]] = payload[1];
    },
    setForm: (s, { payload }: { payload: string }) => {
      s.inpsLen = (payload.match(new RegExp(istyle.input, "g")) || []).length;
    },
    addErr: (s, { payload }) => {
      s.errArr.push(payload);
      if (s.errArr.length === s.inpsLen) {
        s.back.validity = s.errArr.every((v) => v === "");
        s.errArr = [];
      }
    },
    resetData: (s) => {
      s.fields = {
        email: "",
        nickname: "",
        password: "",
        refid: "",
      };
    },
    setRequest: (s, { payload }) => {
      s.back.request = payload[1];
      if (payload[1] === "rejected") {
        s.back.validity = false;
        return;
      }
      if (payload[0])
        if (payload[0].ok) {
          s.back.authorized = true;
          s.back.validity = false;
          s.checked = true;
          s.back.backErr = "";
          setCookie("user", JSON.stringify(payload[0].response), 7);
        } else {
          s.back.backErr = payload[0].response;
          s.back.validity = false;
        }
    },
    setChecked: (s, { payload }) => {
      s.checked = payload;
    },
  },
});

export const { set, setForm, addErr, resetData, setRequest, setChecked } = userSlice.actions;

export default userSlice.reducer;
