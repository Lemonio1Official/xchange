import { useState } from "react";
import s from "./Profile.module.scss";
import { url } from "../../url";
import { checkCookie, getCookie, setCookie } from "../../my/cookies";

type response = {
  response: string;
  ok: boolean;
};

function Settings({ setSettings, user }: { setSettings: (p: boolean) => void; user: any }) {
  const [response, setResponse] = useState<response>({ response: "", ok: false });
  const [field, setField] = useState("");
  const [code, setCode] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div className={s.settings_bg}>
      <div className={s.settings}>
        <div className={s.close} onClick={() => setSettings(false)}>
          <i className="fa-solid fa-xmark" />
        </div>
        <div className={s.title}>security</div>
        <div className={s.container}>
          <div
            className={s.item}
            onClick={() => {
              if (user.email_verified == 0) {
                setField("email");
                setResponse({ response: "", ok: false });
                if (!checkCookie("verify")) {
                  fetch(url + "api/sendcode/" + user.email).then(async (res) => {
                    const resp = await res.json();
                    if (resp.ok) {
                      setResponse({ response: "Code sent", ok: true });
                      setCookie("verify", resp.response, 0.0035);
                    }
                  });
                } else setResponse({ response: "Code sent", ok: true });
              }
            }}
          >
            Email verified
            {user.email_verified == 1 ? (
              <i className={`fa-solid fa-check ${s.check}`} />
            ) : (
              <i className={`fa-solid fa-xmark ${s.xmark}`} />
            )}
          </div>
          <div
            className={s.item}
            onClick={() => {
              setField("password");
              setResponse({ response: "", ok: false });
            }}
          >
            Change password <i className="fa-solid fa-shield" />
          </div>
          <div className={s.space}></div>
          {response.response && <div className={`${s.response} ${response.ok && s.ok}`}>{response.response}</div>}
          {field &&
            (field === "email" ? (
              <div className={s.item + " " + s.field}>
                <input
                  type="number"
                  placeholder="Code from the letter"
                  onChange={(e) => {
                    if (e.target.value.length > 6) e.target.value = e.target.value.slice(0, -1);
                    setCode(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    fetch(url + "api/email/confirm/" + user.id, {
                      method: "POST",
                      body: JSON.stringify({ code: code, hash: getCookie("verify") }),
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        setResponse(res);
                        if (res.ok) setTimeout(() => window.location.reload(), 500);
                      });
                  }}
                >
                  confirm
                </button>
              </div>
            ) : (
              <div className={s.item + " " + s.field}>
                <label>
                  <input type="password" placeholder="Old Password" onChange={(e) => setOldPass(e.target.value)} />
                  <input type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
                </label>
                <button
                  onClick={() => {
                    if (oldPass && newPass)
                      fetch(url + "api/change/password/" + user.id, {
                        method: "POST",
                        body: JSON.stringify({ old: oldPass, new: newPass }),
                      }).then(async (res) => {
                        setResponse(await res.json());
                      });
                    else setResponse({ ok: false, response: "Fill in the fields" });
                  }}
                >
                  confirm
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
