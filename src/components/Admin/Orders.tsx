import { useEffect, useState } from "react";

import sound from "./sound.mp3";
import s from "./Admin.module.scss";
import { url } from "../../url";

const audio = new Audio(sound);

function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(url + "api/orders")
      .then(async (res: any) => setOrders(await res.json()))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    if (orders.length > 0) {
      request(url + "api/orders/new", (data: any) => {
        setOrders([...data, ...orders]);
        audio.play();
      });
    }
  }, [orders]);

  return (
    <div className={s.orders}>
      <div className={s.title}>Orders</div>
      <ul>
        {orders.map((i: any, ind) => (
          <li key={ind}>
            <span className={s.id}>#{i.id}</span>
            <span className={s.uid}>UID {i.user_id}</span>
            <span className={s.couple}>
              {Number(i.fromNumber)} {i.couple.split("_")[0]}
              <s>{i.network.split("_")[0]}</s> <i className="fa-solid fa-right-long" /> {Number(i.toNumber)} {i.couple.split("_")[1]}
              <s>{i.network.split("_")[1]}</s>
            </span>
            <span className={s.rate}>RATE {i.course}</span>
            <span
              className={s.uwallet}
              onClick={() => {
                navigator.clipboard.writeText(i.wallet);
              }}
            >
              User wallet <i className="fa-solid fa-clone" />
            </span>
            <span className={s.status}>
              {i.status === "paid" ? (
                <i className="fa-solid fa-circle-check" />
              ) : (
                <i className={`fa-solid fa-circle-xmark ${s.xmark}`} />
              )}
            </span>
            <button
              onClick={() => {
                fetch(`${url}api/order/complete/${i.id}`)
                  .then(async (res) => {
                    console.log(await res.text());
                  })
                  .catch((e) => console.log(e));
              }}
            >
              perform
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function request(url: string, cb: (p: any) => void) {
  try {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        if (text.indexOf("Maximum execution time") > -1) {
          request(url, cb);
          return;
        }
        cb(JSON.parse(text));
      });
  } catch (e) {
    console.log(e);
  }
}

export default Orders;
