import s from "./Privacy.module.scss";

const list = [
  {
    title: "PRIVACY POLICY",
    text: [
      "This statement informs about our policy and options regarding the collection, use and disclosure of personal data when using the xChange service",
      "By using xChange services, you agree to the collection and use of information in accordance with this policy. Our privacy and data processing policy cannot contradict the rules of the user agreement.",
      "The data of our users will be used to improve the quality of our service.",
      "xChange operates the our website (hereinafter the “Service”)",
      "Effective date: Sep 7, 2021",
    ],
  },
  {
    title: "COLLECTION AND USE OF INFORMATION",
    text: [
      "We collect several different types of information for different purposes in order to provide and improve our Service for you.",
      "Types of data collected:",
      "Personal data",
      "When using our Service, we may ask you to provide us with certain information. This information can be used to contact or identify you. Identification information may inсlude:",
      "– Name",
      "– Email address",
    ],
  },
  {
    title: "USE OF DATA",
    text: [
      "xChange uses the collected data to:",
      "Providing a high level of service and support to our users;",
      "Notifying you about changes in the operation of our Service;",
      "To monitor the use of the Service;",
      "Maintaining the performance of our Service and eliminating technical problems;",
      "To analyze ways to improve the Service.",
    ],
  },
  {
    title: "DATA TRANSFER",
    text: [
      "We will take all necessary steps to ensure that your data is processed securely in accordance with this Privacy and Data Processing Policy.",
      "The transfer of your personal data and other personal information will not be carried out if there is no leakage of the security of your data and its control.",
    ],
  },
  {
    title: "DATA SECURITY",
    text: [
      "The security of your data is one of our priorities in our work. We strive to protect the personal data of our users as much as possible. Nevertheless, none of the data storage methods can be called completely secure and therefore we cannot guarantee the absolute security of your data.",
    ],
  },
  {
    title: "DATA DISCLOSURE",
    text: [
      "If you do not accept cookies, then you will not be able to use some of the functions of the Service.",
      "Cookies are sent to your browser from a website and stored on your device. coоkie files are small data files that may inсlude an anonymous unique identifier. Tracking technologies that are also used – tags and scripts to collect and track information, as well as to improve and analyze our Service.",
      "Examples of the use of cookies and similar technologies to track the activity of users of our Service and store certain information:",
      "Security Cookies – this type of Cookies is used to ensure the safe operation of our Service;",
      "Session Cookies – Session Cookies are used to operate our Service;",
      "Preference Cookies – Used to remember your preferences and various settings.",
    ],
  },
];

function Privacy() {
  return (
    <div className={s.privacy}>
      <div className={s.title}>Privacy policies</div>
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

export default Privacy;
