import s from "./TermsOS.module.scss";

const list = [
  {
    title: "1. General Terms",
    text: [
      "This agreement (hereinafter referred to as Agreement) describes the terms and conditions under which the xChange multi-currency exchange service is provided. (hereinafter referred to as User) to enter into a Service Agreement with xChange on the terms and conditions set forth below.",
      'Before using the xChange service, the User is obliged to read in full the terms of the "xChange Service Agreement". Use of the services of xChange shall only be possible if the User accepts all the terms of the Agreement. The current version of the Agreement is available for public access on the Service Website.',
    ],
  },
  {
    title: "2. Terms and definitions used in the Agreement",
    text: [
      "The xChange service — is a trademark and business name for the internet exchange, sale and purchase of electronic currencies",
      "User — any individual or legal entity who wishes to use the services of the Service and who has accepted the Agreement in accordance with its terms.",
      "Electronic currency – is a digitally expressed monetary and/or other liability between the developer of this currency and its user",
      "Payment/transaction — is a transfer of electronic and/or other currency from the payer to the recipient.",
      "Application – is an expression of the User's intention to use one of the services offered by the xChange Service by filling out the electronic form via the Service's website, under the terms described in the Agreement and specified in the parameters of this Application.",
      "Source currency – is an electronic currency that the User wishes to sell or exchange",
      "Source account – is a wallet number",
      "Resulting currency – is an electronic currency that the User receives as a result of the sale or exchange of the Source currency.",
      "Resulting account – is a wallet number to which the Resulting currency will be sent.",
      "Currency reserve - is an amount of a certain Electronic currency available at the xChange Service at the time of creating the Application.",
      "Currency exchange - is exchange of electronic currency of one payment system for the electronic currency of another payment system.",
      "Rate — is the value ratio of the two electronic currencies during their exchange",
      "Hacker — is a qualified computer trespasser, an intruder who specializes in seeking and using unauthorized access to computer networks or other computerized equipment in order to unlawfully obtain information, gain profit and cause damage.",
    ],
  },
  {
    title: "3. Subject of the Agreement",
    text: [
      "3.1. The subject of this Agreement is the provision of the following services to the User by xChange Service:",
      "3.1.1. electronic currency exchange (Section 6 of the Agreement);",
      "3.1.2. sale of electronic currency to the User (Section 7 of the Agreement);",
      "3.1.3. purchase of electronic currency from the User (Section 8 of the Agreement).",
    ],
  },
  {
    title: "4. Order of the services provision by the Service",
    text: [
      "4.1 The Service carries out the execution of the Applications on an irrevocable basis in accordance with the terms and conditions of the corresponding payment systems.",
      "4.2 The Service is not a party to the agreement between the Payment System and the Client of the Payment System and is in no case liable for the actions of the Payment System and its Client. The rights and obligations of the Payment System and its Customer shall be governed by the terms of service of the respective Payment Systems.",
      "4.3 xChange Service does not require a certification that the sender and the recipient of the Transaction funds are the same legal entity or individual, xChange Service is not a party to the relationship between the sender and the recipient of funds or electronic currency.",
      "4.4. The User don't undertakes to calculate and pay all the taxes required by the tax legislation of the User's location.",
      "4.5. Taking care of the quality of the services provided to the Users, the xChange Service undertakes to carry out all activities under this Agreement as soon as possible.",
      "4.6. In case of technical failure or malfunctioning of the payment systems or the exchange service, the payment can be made within 5 minutes to 24 hours, depending on the time of fixing the failure. At the request of the client, the service can make a refund minus a commission if the problem is on the side of the payment system.",
    ],
  },
  {
    title: "5. Price of services",
    text: [
      "5.1 The Service's fees are set by the Service's management and are published on the Service's website.",
      "5.2 The Service reserves the right to change the exchange rates and the charged commissions unilaterally at any time and notify the Service Users by publishing the information about the changes on the Service website.",
      "5.3 An Application created by the User at the Service website indicates the exchange Rate, the amount of commission charged by the respective Payment system for Exchange method as well as the total amount of the transferred funds and electronic currency.",
      "5.4 The xChange service will charge the value of its fee at the time of the relevant Transaction.",
      "5.5 If the application rate does not correspond to the market rate, based on the current CoinMarketCap data, for any reason the exchange service has the right to recalculate the application at the current rate or issue a refund to the User. The recalculation is done automatically if the CoinMarketCap exchange rate has changed by more than 0.5-2%. The exchange rate can be changed only while waiting for cryptocurrency or other payment system confirmations. As soon as the necessary number of confirmations is received for the chosen direction, the rate is fixed and does not change any more.",
      "5.5.1 The exchange rate will not change in the Application. Exceptions may be made if the User has paid for the application later than the time allocated to it.",
    ],
  },
  {
    title: "6. Exchange of the Electronic currency",
    text: [
      "6.1. By submitting the Application, the User instructs, and the xChange Service on its own behalf and at the expense of the User commits the exchange of the Electronic currency of one Payment System (Source currency) for the Electronic currency of another Payment system (Resulting currency) chosen by the User.",
      "6.2. The User undertakes to transfer the Source currency in the amount specified in the Application, and the xChange Service, upon receipt of the relevant Electronic currency, undertakes to transfer the Resulting currency to the User, calculated at the Rate and in accordance with the tariffs of the Service.",
      '6.3 The Service remuneration for the activities mentioned in the clauses 6.1. and 6.4. of the Agreement is shown in the Application and is confirmed by the User by clicking on the "Next" button on one of the pages of the user interface when filling out the Application.',
      "6.4 The Service's obligation to transfer the Electronic Currency to the User shall be deemed fulfilled at the moment the Electronic Currency is debited from the Service's account in the relevant Payment System, which is recorded in the transaction history of the relevant Payment System.",
    ],
  },
];

function TermsOS() {
  return (
    <div className={s.terms}>
      <div className={s.title}>Terms of Service</div>
      <ul>
        {list.map((i, ind) => (
          <li key={ind}>
            <span>{i.title}</span>
            {i.text.map((i, ind) => (
              <p key={ind}>{i}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TermsOS;
