import { useState, useEffect, useRef } from "react";
import Form from "./Form";
import s from "./Reviews.module.scss";
import { url } from "../../url";

interface IReview {
  name: string;
  comment: string;
  stars: string;
  date: string;
}

const stars = [0, 0, 0, 0, 0];

function Reviews() {
  const [review, setReview] = useState(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    fetch(url + "api/reviews")
      .then((res) => res.json())
      .then((json) => setReviews(json.response))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    if (ulRef.current) ulRef.current.scrollTop = -ulRef.current.scrollHeight;
  }, [ulRef.current]);
  useEffect(() => {
    if (!review) return;
    fetch(url + "api/reviews")
      .then((res) => res.json())
      .then((json) => setReviews(json.response))
      .catch((e) => console.log(e));
    setReview(false);
  }, [review]);

  return (
    <div className={s.reviews}>
      <div className={s.title}>Reviews</div>
      <ul ref={ulRef}>
        {reviews.map((i, ind) => (
          <li key={ind}>
            <div>
              {i.name}{" "}
              <span>
                {stars.map((_, ind) => (
                  <i className={`fa-solid fa-star ${ind < Number(i.stars) && s.active}`} key={ind} />
                ))}
              </span>
            </div>
            <span className={s.comment}>{i.comment}</span>
            <b>{i.date}</b>
          </li>
        ))}
      </ul>
      <Form setReview={setReview} />
    </div>
  );
}

export default Reviews;
