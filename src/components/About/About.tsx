import s from "./About.module.scss";

function About() {
  return (
    <div className={s.about}>
      <div className={s.title}>About us</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={s.entry}>
          <span>
            Мore than <b>2 years</b> we have been growing and developing, helping hundreds of people to make profitable exchanges in 64
            directions.
          </span>
          <i className="fa-brands fa-nfc-directional" />
        </div>
        <div className={s.desc}>
          <span>
            Following the development of information technology, commercial structures got a generous gift – a multimillion Internet
            audience, which eagerly preferred online shopping in the comfort of their own home to hours of walking shopping and tiring
            queues. However, aside from the advantages, electronic commerce systems had one significant drawback – payment of goods
            with cash or credit cards appeared very problematic for most buyers. <br />
            <br />
            Electronic payment systems solved this problem by simplifying the mutual settlements between sellers and buyers. Now there
            is no need to go to the office of the online store or transfer money from the bank account to pay for the purchase. All it
            takes is to purchase a certain amount of title units of a certain payment system and use them to pay for goods or services
            online. Unfortunately, different online stores accept electronic money from different payment systems. This is how an
            urgent need emerged to create services that would quickly help users solve problems with a certain kind of electronic
            currency. <br />
            <br />
            Basic functions of xChange – are exchange, refill and withdrawal of electronic currencies of various payment systems. The
            mission of xChange is to simplify any operations with electronic money , help Internet venues create efficient tools for
            settlements with customers, and enable representatives of traditional business to pay for their goods and services with
            electronic money.
          </span>
        </div>
      </div>
    </div>
  );
}

export default About;
