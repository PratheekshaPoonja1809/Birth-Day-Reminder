import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import {
  DATE_TYPE,
  INITIAL_REDUCER_DATA,
  DROPDOWN_OPTIONS,
  REDUCER_DATA,
  useSession,
  MESSAGES,
  ICON_COLOR,
  GET_SAMPLE_DATA_URL,
  SAMPLE_DATA,
} from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import {
  computeDaysPending,
  FilterDateFormatter,
  getDOB,
  sendMail,
} from "./helper";
import { Modal } from "./utils/Modal";
import { InputForm } from "./InputForm";
import ProfilePicDefault from "./assets/picture.png";
import Celebrate from "./assets/celebrate.png";
import { FeedbackComponent } from "./FeedbackComponent";
import { LazyLoadIcons } from "./utils/LazyLoadIcons";
import UseQuery from "./utils/UseQuery";

const reducerFn = (state, action) => {
  switch (action.type) {
    case REDUCER_DATA.DATA_SOURCE: //To store Sample Data
      return { ...state, dataSource: action.payload };
    case REDUCER_DATA.LIST: //To store Sample & real time data
      return { ...state, list: action.payload };
    case REDUCER_DATA.SHOW_CONTENT: //To show the details of particular item when clicked
      return { ...state, showContent: action.payload };
    case REDUCER_DATA.SELECTED: //Selection made on the dropdown
      return { ...state, selected: action.payload };
    case REDUCER_DATA.MEMBER_DETAIL: //Editable Member's detail to send to popup
      return { ...state, memberDetails: action.payload };
    default:
      throw new Error(`Unknown action performed: ${action.type}`);
  }
};

export const BirthdayListComp = () => {
  const { data:sampleData } = UseQuery(GET_SAMPLE_DATA_URL);
  const [searchInput, setSearchInput] = useState("");

  const [uiState, setUiState] = useState({
    isModalOpen: false,
    isExpanded: false,
    isFeedbackRequested: false,
  });

  const [state, dispatch] = useReducer(reducerFn, INITIAL_REDUCER_DATA);

  const { session, setSession } = useSession();

  const loadSampleData = () => {
    const dataToStore = !state.dataSource.length ? (sampleData??SAMPLE_DATA) : []
    dispatch({ type: REDUCER_DATA.DATA_SOURCE, payload: dataToStore });
  };

  const showCompleteDetail = (details) => {
    state.showContent.includes(details.id)
      ? dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [] })
      : dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [details.id] });
  };

  const sendBirthdayCard = (item, e) => {
    e.stopPropagation();
    sendMail(item);
  };

  const updateDetails = (e, item = null) => {
    e.stopPropagation();
    const userDetail = item ?? "";
    dispatch({ type: REDUCER_DATA.MEMBER_DETAIL, payload: userDetail });
    setUiState((prev) => ({ ...prev, isModalOpen: true }));
  };

  const deleteDetails = (e, detail) => {
    e.stopPropagation();
    setSession((prev) => prev.filter((item) => item.id !== detail.id));
  };

  const searchByName = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const timelineSelected = useCallback(() => {
    const today = dayjs();
    let formatter;
    let compareDate = today;

    const completeList = [...session, ...state.dataSource].filter((item) =>
      item.name.toUpperCase().includes(searchInput.toUpperCase())
    );

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

    if (state.selected === DROPDOWN_OPTIONS[0]) {
      dispatch({
        type: REDUCER_DATA.LIST,
        payload: completeList,
      });
    } else {
      const filtered = completeList.filter((item) =>
        FilterDateFormatter(formatter, compareDate, dayjs(item.dob))
      );
      dispatch({ type: REDUCER_DATA.LIST, payload: filtered });
    }

    dispatch({ type: REDUCER_DATA.SHOW_CONTENT, payload: [] });
  }, [state.selected, state.dataSource, session, searchInput]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      timelineSelected();
    }, 0);

    return () => clearTimeout(timeout);
  }, [state.selected, session, searchInput, timelineSelected]);

  return (
    <main className="main-container">
      <div className="menu-container">
        <Dropdown
          options={DROPDOWN_OPTIONS}
          label={MESSAGES.DROPDOWM_MSG}
          selected={state.selected}
          setSelected={(value) =>
            dispatch({ type: REDUCER_DATA.SELECTED, payload: value })
          }
        />
        <section className="menu-icons">
          <div className="search-container">
            <input
              type="text"
              value={searchInput}
              onChange={searchByName}
              placeholder="Search..."
              className={`search-input ${uiState.isExpanded ? "expanded" : ""}`}
            />
            <LazyLoadIcons
              name="search"
              className="search-btn"
              content={"Search"}
              color={ICON_COLOR}
              onClick={() =>
                setUiState((prev) => ({
                  ...prev,
                  isExpanded: !prev.isExpanded,
                }))
              }
            />
          </div>
          <LazyLoadIcons
            color={ICON_COLOR}
            name="user"
            className="menu-option "
            content={MESSAGES.ADD_CONTACTS}
            onClick={updateDetails}
          />
          <LazyLoadIcons
            name={!state.dataSource.length ? "file_plus" : "file_minus"}
            className="menu-option "
            color={ICON_COLOR}
            content={
              !state.dataSource.length
                ? MESSAGES.LOAD_SAMPLE_DATA
                : MESSAGES.REMOVE_SAMPLE_DATA
            }
            onClick={loadSampleData}
          />
          <LazyLoadIcons
            name="star"
            color={ICON_COLOR}
            className="menu-option "
            content={MESSAGES.FEEDBACK}
            onClick={() =>
              setUiState((prev) => ({
                ...prev,
                isFeedbackRequested: !uiState.isFeedbackRequested,
              }))
            }
          />
        </section>
      </div>
      {uiState.isModalOpen && (
        <Modal
          headerName="Contact Update"
          onClose={() =>
            setUiState((prev) => ({ ...prev, isModalOpen: false }))
          }
          alert={true}
        >
          <InputForm
            onClose={() =>
              setUiState((prev) => ({ ...prev, isModalOpen: false }))
            }
            data={state.memberDetails}
          />
        </Modal>
      )}
      {uiState.isFeedbackRequested && (
        <Modal
          onClose={() =>
            setUiState((prev) => ({
              ...prev,
              isFeedbackRequested: !uiState.isFeedbackRequested,
            }))
          }
          headerName={MESSAGES.FEEDBACK}
          width="40%"
          minWidth="40%"
        >
          <FeedbackComponent />
        </Modal>
      )}
      <section className="birthday-list-cntr">
        {!state.list.length ? (
          <h3
            style={{
              color: "orange",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {MESSAGES.NO_BDAY_TONIGHT} <LazyLoadIcons name="frown" />
          </h3>
        ) : (
          state.list.map((item) => {
            const daysLeft = getDOB(item.dob);
            const color =
              daysLeft === 0 ? "#7d497d" : daysLeft < 0 ? "#5a5858" : "#650765";
            return (
              <Fragment key={item.id}>
                <section
                  onClick={() => showCompleteDetail(item)}
                  style={{ cursor: "pointer", position: "relative" }}
                  className={`${
                    state.showContent?.includes(item.id)
                      ? "full-details-section"
                      : "simple-details"
                  } ${daysLeft === 0 ? "celebrate-today" : ""}`}
                >
                  <div>
                    {daysLeft <= 7 && daysLeft >= -7 && (
                      <Tippy
                        content={
                          daysLeft < 0
                            ? MESSAGES.BELATED_WISH
                            : MESSAGES.BDAY_WISH
                        }
                      >
                        <img
                          src={Celebrate}
                          alt={Celebrate}
                          className="celebrate-icon"
                          onClick={(e) => sendBirthdayCard(item, e)}
                        />
                      </Tippy>
                    )}
                    <img
                      src={item.image || ProfilePicDefault}
                      alt={`${item.name}'s profile`}
                    />
                    {state.showContent?.includes(item.id) &&
                      !item.id?.startsWith("Sample") && (
                        <>
                          <LazyLoadIcons
                            name="trash"
                            className="delete-icon "
                            content="Delete"
                            onClick={(e) => deleteDetails(e, item)}
                          />
                          <LazyLoadIcons
                            name="edit"
                            className="edit-icon "
                            content="Edit"
                            onClick={(e) => updateDetails(e, item)}
                          />
                        </>
                      )}
                    {!state.showContent?.includes(item.id) && (
                      <>
                        <h3>{item.name?.toUpperCase()}</h3>
                        <p>{dayjs(item.dob).format(DATE_TYPE.DDMMMYYYY)}</p>
                      </>
                    )}
                  </div>
                  {state.showContent?.includes(item.id) && (
                    <div
                      className="grid-detail"
                      style={{ gridColumn: `0 / 4` }}
                    >
                      <h3> {item.name?.toUpperCase()}</h3>
                      <h5>DOB: {item.dob}</h5>
                      <h5>
                        {` Age: ${dayjs().diff(
                          dayjs(item.dob),
                          "year"
                        )} years old`}
                      </h5>
                      <h5 style={{ color }}>{computeDaysPending(item.dob)}</h5>
                      {item.relationship && (
                        <h5>{`Relationship: ${item.relationship}`}</h5>
                      )}
                      {item.phoneNo && (
                        <h5 className="contact-info-icon">
                          <LazyLoadIcons
                            name="phone"
                            className="details-icon"
                          />
                          {item.phoneNo}
                        </h5>
                      )}
                      {item.email && (
                        <h5 className="contact-info-icon">
                          <LazyLoadIcons name="mail" className="details-icon" />
                          <a
                            href={`mailto:${item.email}`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {item.email}
                          </a>
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
