import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import {
  DATA,
  DATE_TYPE,
  INITIAL_REDUCER_DATA,
  DROPDOWN_OPTIONS,
  REDUCER_DATA,
  FEEDBACK,
  useSession,
} from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import { Download, Linkedin, Mail, Phone, Star, UserPlus } from "react-feather";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import { FilterDateFormatter, getDOB } from "./helper";
import { Modal } from "./utils/Modal";
import { InputForm } from "./InputForm";
import ProfilePicDefault from "./assets/picture.png";

const reducerFn = (state, action) => {
  switch (action.type) {
    case REDUCER_DATA.DATA_SOURCE:
      return { ...state, dataSource: action.payload };
    case REDUCER_DATA.LIST:
      return { ...state, list: action.payload };
    case REDUCER_DATA.SHOW_CONTENT:
      return { ...state, showContent: action.payload };
    case REDUCER_DATA.SELECTED:
      return { ...state, selected: action.payload };
    default:
      throw new Error(`Unknown action performed: ${action.type}`);
  }
};

export const BirthdayListComp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isFeedbackRequested, setFeedbackRequested] = useState(false);

  const [state, dispatch] = useReducer(reducerFn, INITIAL_REDUCER_DATA);

  const { session } = useSession();

  const loadSampleData = () => {
    if (!state.dataSource.length)
      dispatch({ type: REDUCER_DATA.DATA_SOURCE, payload: DATA });
  };

  const computeDaysPending = (date) => {
    const daysLeft = getDOB(date);

    if (daysLeft > 0) {
      return `⏳ ${daysLeft} day(s) to go`;
    } else if (daysLeft === 0) {
      return "It's celebration time!";
    }
    return `${Math.abs(daysLeft)} day(s) late to the party!`;
  };

  const showCompleteDetail = (details) => {
    state.showContent.includes(details.id)
      ? dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [] })
      : dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [details.id] });
  };

  const timelineSelected = useCallback(() => {
    if (!state.dataSource.length) return;

    const today = dayjs();
    let formatter;
    let compareDate = today;

    switch (state.selected) {
      case DROPDOWN_OPTIONS[1]:
      case DROPDOWN_OPTIONS[2]:
        formatter = DATE_TYPE.MMDD;
        compareDate =
          state.selected === DROPDOWN_OPTIONS[2]
            ? today.add(1, DATE_TYPE.DAY)
            : today;
        break;
      case DROPDOWN_OPTIONS[3]:
        formatter = DATE_TYPE.MMDD;
        compareDate = today.subtract(1, DATE_TYPE.DAY);
        break;
      case DROPDOWN_OPTIONS[4]:
      case DROPDOWN_OPTIONS[5]:
        formatter = DATE_TYPE.MM;
        compareDate =
          state.selected === DROPDOWN_OPTIONS[5]
            ? today.add(1, DATE_TYPE.MONTH)
            : today;
        break;
      default:
        break;
    }

    dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [] });

    if (state.selected === DROPDOWN_OPTIONS[0]) {
      dispatch({
        type: REDUCER_DATA.LIST,
        payload: [...session, ...state.dataSource],
      });
    } else {
      const filtered = state.dataSource.filter((item) =>
        FilterDateFormatter(formatter, compareDate, dayjs(item.dob))
      );
      dispatch({ type: REDUCER_DATA.LIST, payload: [...session, ...filtered] });
    }
  }, [state.selected, state.dataSource, session]);

  useEffect(() => {
    timelineSelected();
  }, [state.selected, timelineSelected, session]);

  return (
    <main className="main-container">
      <Dropdown
        options={DROPDOWN_OPTIONS}
        label="Who's Celebrating Soon?:"
        selected={state.selected}
        setSelected={(value) =>
          dispatch({ type: REDUCER_DATA.SELECTED, payload: value })
        }
      />
      <section className="menu-icons">
        <Tippy content="Add Contacts">
          <UserPlus onClick={() => setOpenModal(true)} />
        </Tippy>
        <Tippy content="Load Sample Data">
          <Download onClick={loadSampleData} />
        </Tippy>
        <Tippy content="Give us your thoughts">
          <Star
            className="menu-option "
            onClick={() => setFeedbackRequested(!isFeedbackRequested)}
          />
        </Tippy>
      </section>
      {openModal && (
        <Modal headerName="Contact Update" onClose={setOpenModal} alert={true}>
          <InputForm onClose={setOpenModal} />
        </Modal>
      )}
      {isFeedbackRequested && (
        <Modal
          onClose={() => setFeedbackRequested(!isFeedbackRequested)}
          headerName="Share Your Thoughts"
          width="35%"
        >
          <p className="feedback-para">
            {FEEDBACK.MSG1}
            <a href={FEEDBACK.MAIL}>
              <Tippy content="Get in touch via email">
                <Mail width="35px" />
              </Tippy>
            </a>{" "}
            or{" "}
            <a
              href={FEEDBACK.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tippy content="Connect with me on LinkedIn">
                <Linkedin width="35px" />
              </Tippy>
            </a>
            {FEEDBACK.MSG2}.
          </p>
        </Modal>
      )}
      <section className="birthday-list-cntr">
        {!state.list.length ? (
          <p>No candles to blow out today</p>
        ) : (
          state.list.map((item) => {
            const daysLeft = getDOB(item.dob);
            const color =
              daysLeft === 0 ? "green" : daysLeft < 0 ? "gray" : "violet";
            return (
              <Fragment key={item.id}>
                <section
                  onClick={() => showCompleteDetail(item)}
                  style={{ cursor: "pointer" }}
                  className={
                    state.showContent?.includes(item.id)
                      ? "full-details-section"
                      : ""
                  }
                >
                  <div>
                    <img
                      src={item.image || ProfilePicDefault}
                      alt={`${item.name}'s profile`}
                    />
                    {!state.showContent?.includes(item.id) && (
                      <>
                        <h3>{item.name}</h3>
                        <p>{dayjs(item.dob).format(DATE_TYPE.DDMMMYYYY)}</p>
                      </>
                    )}
                  </div>
                  {state.showContent?.includes(item.id) && (
                    <div
                      className="grid-detail"
                      style={{ gridColumn: `0 / 4` }}
                    >
                      <h3> {item.name}</h3>
                      <h5>DOB: {item.dob}</h5>
                      <h5>
                        {` Age: ${dayjs().diff(
                          dayjs(item.dob),
                          "year"
                        )} years old`}
                      </h5>
                      <h5 style={{ color }}>{computeDaysPending(item.dob)}</h5>
                      {item.relation && (
                        <h5>{`Relationship: ${item.relation}`}</h5>
                      )}
                      {item.phoneNo && (
                        <h5 className="contact-info-icon">
                          <Phone className="details-icon" /> {item.phoneNo}
                        </h5>
                      )}
                      {item.email && (
                        <h5 className="contact-info-icon">
                          <Mail className="details-icon" />
                          <a href={`mailto:${item.email}`}>{item.email}</a>
                        </h5>
                      )}
                    </div>
                  )}
                </section>
              </Fragment>
            );
          })
        )}
      </section>
    </main>
  );
};
