import { FEEDBACK, ICON_COLOR, MESSAGES } from "./utils/Constants";
import { LazyLoadIcons } from "./utils/LazyLoadIcons";

export const FeedbackComponent = () => {
  return (
    <p className="feedback-para">
      {FEEDBACK.MSG1}
      <a href={FEEDBACK.MAIL}>
        <LazyLoadIcons
          name="mail"
          content={MESSAGES.MAIL_CONNECT}
          width="35px"
          color={ICON_COLOR}
        />
      </a>{" "}
      or{" "}
      <a href={FEEDBACK.LINKEDIN} target="_blank" rel="noopener noreferrer">
        <LazyLoadIcons
          name="linkedIn"
          content={MESSAGES.LINKEDIN_CONNECT}
          width="35px"
          color={ICON_COLOR}
        />
      </a>
      {FEEDBACK.MSG2}.
    </p>
  );
};
