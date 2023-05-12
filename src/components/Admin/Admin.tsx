import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCookie } from "../../my/cookies";
import Orders from "./Orders";
import s from "./Admin.module.scss";
import { url } from "../../url";

function Admin() {
  const [beta, setBeta] = useState(false);

  useEffect(() => {
    if (getCookie("beta"))
      fetch(url + "api/beta", {
        method: "POST",
        body: JSON.stringify({ beta: getCookie("beta") }),
      })
        .then((res) => res.json())
        .then((json) => json.ok && setBeta(true))
        .catch((e) => console.log(e));
  }, []);

  return (
    <div className={`${s.admin} ${!beta && s.err404}`}>
      {beta ? (
        <>
          <Orders />
        </>
      ) : (
        <span>
          404 Not Found <Link to="/">Go to Main page</Link>
        </span>
      )}
    </div>
  );
}

export default Admin;
