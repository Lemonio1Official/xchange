import { useState, useEffect } from "react";
import s from "./Help.module.scss";
import { url } from "../../url";

function Form() {
  const [email, setEmail] = useState("");
  const [mess, setMess] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (submit) {
      const errs = [];
      if (!(email.indexOf("@") > -1) || email.length < 8) errs.push("email");
      if (mess.length < 10) errs.push("mess");
      if (errs.length > 0) setErrors(errs);
      else {
        setErrors([]);
        fetch(url + "api/help", {
          method: "POST",
          body: JSON.stringify({ email, mess }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.ok) {
              setEmail("");
              setMess("");
              alert("Message sent successfully");
            }
          })
          .catch((e) => console.log(e));
      }
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div className={s.contact}>
      <div className={s.cTitle}>Have a question?</div>
      <input
        type="text"
        className={errors.includes("email") ? s.err : ""}
        placeholder="Email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <span>Message</span>
      <textarea
        cols={30}
        rows={5}
        className={errors.includes("mess") ? s.err : ""}
        value={mess}
        onChange={({ target }) => setMess(target.value)}
      ></textarea>
      <button className={s.send} onClick={() => setSubmit(true)}>
        Contact us
      </button>
    </div>
  );
}

export default Form;
