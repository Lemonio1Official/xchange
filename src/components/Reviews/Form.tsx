import { useState, useEffect } from "react";

import s from "./Reviews.module.scss";
import { url } from "../../url";

const stars = [0, 0, 0, 0, 0];

function Form({ setReview }: { setReview: (p: boolean) => void }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(3);
  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState<string[]>([]);

  useEffect(() => {
    if (submit) {
      const nameInvalid = name.length < 4 || name.length > 15;
      const commentInvalid = comment.length < 15 || comment.length > 100;
      if (nameInvalid) setErr([...err, "name"]);
      else setErr((i) => i.filter((v) => v !== "name"));
      if (commentInvalid) setErr((i) => [...i, "comment"]);
      else setErr((i) => i.filter((v) => v !== "comment"));
      if (nameInvalid || commentInvalid) {
        setSubmit(false);
        return;
      } else {
        setName("");
        setComment("");
        setStar(3);
        fetch(url + "api/reviews/add", {
          method: "POST",
          body: JSON.stringify({ name, comment, star }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.ok) setReview(true);
          })
          .catch((e) => console.log(e));
      }
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div className={s.addreview}>
      <input
        type="text"
        className={err.includes("name") ? s.err : ""}
        placeholder="Name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <span>Сomment</span>
      <textarea
        cols={30}
        rows={5}
        className={err.includes("comment") ? s.err : ""}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <div className={s.stars}>
        {stars.map((_, ind) => (
          <i className={`fa-solid fa-star ${ind < star && s.active}`} key={ind} onClick={() => setStar(ind + 1)} />
        ))}
      </div>
      <button className={s.add} onClick={() => setSubmit(true)}>
        Add a review
      </button>
    </div>
  );
}

export default Form;
