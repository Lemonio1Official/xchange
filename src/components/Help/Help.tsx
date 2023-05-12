import Form from "./Form";
import s from "./Help.module.scss";

const qts = [
  {
    title: "Whether the registration is compulsory on your site?",
    text: "No, the registration is not compulsory. But if you register on our service, you will be able to participate in the cumulative discount program and the referral program.",
  },
  {
    title: "How to make an exchange on your site?",
    text: "You need to choose the direction of exchange and fill in an exchange application. Click the Exchange and follow the instructions available on the confirmation panel of the exchange request.",
  },
  {
    title: "Do you have an affiliate program?",
    text: "Yes. We have a pretty clear and transparent affiliate program which can bring you 40% of our earnings for the exchanges of the users you quoted. Payment of remuneration is paid from 10 USD. ",
  },
  {
    title: "What bonuses are available for the regular customers?",
    text: "Any registered user while making any exchange already participates in the formation of his/her cumulative discount. You can get a coefficient applied to the formation of a more favorable exchange rate for you with each subsequent exchange after the reaching any of the stages of this our loyalty program. Hence, you get a discount for any exchange in direction. You can find more detailed information after the registration in Personal Account.",
  },
  {
    title: "I had transferred the digital currency but I did not get my money.",
    text: "Bitcoin exchange operations occur only after receiving 1st confirmation from the system. Ethereum exchange ones occur only after receiving 2nd confirmation from the system.",
  },
  {
    title: "Bitcoin operation is not confirmed for a long time. What does it mean?",
    text: "Transfers in Bitcoin system may permanent in the status of “Unconfirmed Transaction” for a long time. Most often this happens due to the fact that one of the operations does not process. According to the rules of Bitcoin network such a problematic transfer is attached to another block and then is processed by standard procedure. If this does not happen, the funds are returned to the sender within 1-7 days. Unfortunately, our exchange service cannot affect the processing speed of such transfers. After being deposited or returned to the sender the situation with the application will be resolved by its completion or cancellation with the return of all monetary obligations of each party if such payment is delayed for a rather long period of time. The decision is taken towards each case separately.",
  },
  {
    title: "Can I cancel the exchange if I have already paid for the application?",
    text: "If you have already paid the application then you are not able to cancel the exchange. You can make a reverse exchange operation but in this case all fees are covered at the customer’s expense.",
  },
  {
    title: "I specified incorrect require details. The funds have not come. What should I do?",
    text: "Unfortunately, we will not be able to refund your funds. The only thing that we can do is to provide the requisite details where the funds were forwarded. Be careful while entering data!",
  },

  {
    title: "Is it possible to exchange an amount that is more than the one indicated on the site?",
    text: "Yes, it is possible. You need to contact the operator and discuss the details of the exchange during the working hours. We will try to provide our reserves with the necessary means for your operation. You can also leave a request on the site to monitor the reserve. A notification will be sent to the post office when we have the amount you need.",
  },
];

function Help() {
  return (
    <div className={s.help}>
      <div className={s.title}>Help</div>
      <ul>
        {qts.map((i, ind) => (
          <li key={ind}>
            <span>{i.title}</span>
            {i.text}
          </li>
        ))}
      </ul>
      <Form />
    </div>
  );
}

export default Help;
