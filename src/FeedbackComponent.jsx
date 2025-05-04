import Tippy from "@tippyjs/react";
import { FEEDBACK, MESSAGES } from "./utils/Constants";
import { Linkedin, Mail } from "react-feather";

export const FeedbackComponent = () => {
  return (
    <p className="feedback-para">
      {FEEDBACK.MSG1}
      <a href={FEEDBACK.MAIL}>
        <Tippy content={MESSAGES.MAIL_CONNECT}>
          <Mail width="35px" />
        </Tippy>
      </a>{" "}
      or{" "}
      <a href={FEEDBACK.LINKEDIN} target="_blank" rel="noopener noreferrer">
        <Tippy content={MESSAGES.LINKEDIN_CONNECT}>
          <Linkedin width="35px" />
        </Tippy>
      </a>
      {FEEDBACK.MSG2}.
    </p>
  );
};
