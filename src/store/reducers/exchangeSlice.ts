import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import istyle from "../../components/Input/input.module.scss";
import { rootState } from "../store";
import { checkCookie, getCookie, setCookie } from "../../my/cookies";
import { url } from "../../url";

type direction = { name: [string, string]; course: number };
type fields = { fromNumber: number; toNumber: number; email: string; name: string; wallet: string };

interface IExchange {
  from: direction;
  to: direction;
  course: number;
  exVolume: number;
  fields: fields;
  payment: "" | "pending" | "success";
  inpsLen: number;
  errArr: string[];
  back: {
    validity: boolean;
    request: "" | "rejected" | "pending";
    backErr: string;
  };
}

const initialState: IExchange = {
  from: { name: ["", ""], course: 0 },
  to: { name: ["", ""], course: 0 },
  course: 0,
  exVolume: 0,
  fields: {
    fromNumber: 0,
    toNumber: 0,
    email: "",
    name: "",
    wallet: "",
  },
  payment: "",
  inpsLen: 0,
  errArr: [],
  back: {
    validity: false,
    request: "",
    backErr: "",
  },
};

export const newOrder = createAsyncThunk("exchange/newOrder", async (_, { dispatch, getState }) => {
  const s = getState() as rootState;
  const user_id = checkCookie("user") ? JSON.parse(getCookie("user")).id : 0;
  dispatch(setDirection(["from", ["ETH", "BEP20"]]));
  dispatch(setDirection(["to", ["USDT", "TRC20"]]));
  try {
    dispatch(setRequest([null, "pending"]));
    const res = await fetch(url + "api/createorder", {
      method: "POST",
      body: JSON.stringify({
        user_id,
        ...s.exchangeReducer.fields,
        couple: s.exchangeReducer.from.name[0] + "_" + s.exchangeReducer.to.name[0],
        networks: s.exchangeReducer.from.name[1] + "_" + s.exchangeReducer.to.name[1],
        course: s.exchangeReducer.course,
        exVolume: s.exchangeReducer.exVolume,
      }),
    });
    const json = await res.json();
    dispatch(setRequest([json, ""]));
  } catch (e) {
    console.log(e);
    console.log("404 NOT FOUND");
    dispatch(setRequest([null, "rejected"]));
  }
});

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setDirection: (s, { payload }: { payload: ["from" | "to", [string, string]] }) => {
      s[payload[0]].name = payload[1];
    },
    setCourse: (s, { payload }: { payload: ["from" | "to", number] }) => {
      s[payload[0]].course = payload[1];
      const course = s.from.course / s.to.course;
      s.course = Number(course.toFixed(8));
      s.fields.toNumber = Number((s.fields.fromNumber * s.course).toFixed(8));
    },
    set: (s, { payload }: { payload: [keyof fields, string | number] }) => {
      if (payload[0] === "fromNumber" || payload[0] === "toNumber")
        typeof payload[1] === "number" && (s.fields[payload[0]] = payload[1]);
      else typeof payload[1] === "string" && (s.fields[payload[0]] = payload[1]);
      if (payload[0] === "fromNumber") {
        s.fields.toNumber = Number((s.fields.fromNumber * s.course).toFixed(8));
        s.exVolume = Number((s.fields.fromNumber * s.from.course).toFixed(8));
      }
      if (payload[0] === "toNumber") {
        s.fields.fromNumber = Number((s.fields.toNumber / s.course).toFixed(8));
        s.exVolume = Number((s.fields.fromNumber * s.from.course).toFixed(8));
      }
    },
    setForm: (s, { payload }: { payload: string }) => {
      s.inpsLen = (payload.match(new RegExp(istyle.input, "g")) || []).length;
    },
    addErr: (s, { payload }) => {
      s.errArr.push(payload);
      if (s.errArr.length === s.inpsLen) {
        s.back.validity = s.errArr.every((v) => v === "") && s.exVolume > 9.95 && s.exVolume < 5000;
        s.exVolume < 9.95 || s.exVolume > 5000 ? (s.back.backErr = "Invalid exchange range") : (s.back.backErr = "");
        s.errArr = [];
      }
    },
    setRequest: (s, { payload }) => {
      s.back.request = payload[1];
      if (payload[1] === "rejected") {
        s.back.validity = false;
        return;
      }
      if (payload[0]) {
        if (payload[0].ok) {
          setCookie("exchange", JSON.stringify(payload[0].response), 0.004);
          s.payment = "pending";
          s.back.backErr = "";
          s.fields = {
            fromNumber: 0,
            toNumber: 0,
            email: "",
            name: "",
            wallet: "",
          };
        } else {
          s.back.backErr = payload[0].response;
        }
        s.back.validity = false;
      }
    },
    setPayment: (s, { payload }) => {
      s.payment = payload;
    },
  },
});

export const { setDirection, setCourse, set, setForm, addErr, setRequest, setPayment } = exchangeSlice.actions;

export default exchangeSlice.reducer;
