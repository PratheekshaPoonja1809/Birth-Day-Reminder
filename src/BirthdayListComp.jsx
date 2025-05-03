import { Fragment, useCallback, useEffect, useState } from "react";
import { DATA, OPTIONS } from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import { Download, UserPlus } from "react-feather";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import { FilterDateFormatter, getDOB } from "./helper";
import { Modal } from "./utils/Modal";
import { InputForm } from "./InputForm";

export const BirthdayListComp = () => {
  const [selected, setSelected] = useState(OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [list, setList] = useState([]);
  const [displayAns, setDisplayAns] = useState([]);

  const loadSampleData = () => {
    if (!dataSource.length) setDataSource(DATA);
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
    displayAns.includes(details.id)
      ? setDisplayAns([])
      : setDisplayAns([details.id]);
  };

  const timelineSelected = useCallback(() => {
    if (!dataSource.length) return;

    const today = dayjs();
    let formatter;
    let compareDate = today;

    switch (selected) {
      case OPTIONS[1]:
      case OPTIONS[2]:
        formatter = "MM-DD";
        compareDate = selected === OPTIONS[2] ? today.add(1, "day") : today;
        break;
      case OPTIONS[3]:
        formatter = "MM-DD";
        compareDate = today.subtract(1, "day");
        break;
      case OPTIONS[4]:
      case OPTIONS[5]:
        formatter = "MM";
        compareDate = selected === OPTIONS[4] ? today.add(1, "month") : today;
        break;
      default:
        break;
    }

    setDisplayAns([]);

    if (selected === OPTIONS[0]) {
      setList(dataSource);
    } else {
      const filtered = dataSource.filter((item) =>
        FilterDateFormatter(formatter, compareDate, dayjs(item.dob))
      );
      setList(filtered);
    }
  }, [selected, dataSource]);

  useEffect(() => {
    timelineSelected();
  }, [selected, timelineSelected]);

  return (
    <main className="main-container">
      <Dropdown
        options={OPTIONS}
        label="Who's Celebrating Soon?:"
        selected={selected}
        setSelected={setSelected}
      />
      <section className="menu-icons">
        <Tippy content="Add Contacts">
          <UserPlus onClick={() => setOpenModal(true)} />
        </Tippy>
        <Tippy content="Load Sample Data">
          <Download onClick={loadSampleData} />
        </Tippy>
      </section>
      {openModal && (
        <Modal headerName="Contact Update" onClose={setOpenModal}>
          <InputForm />
        </Modal>
      )}
      {/* {isLoading && <LoadingIndicator />} */}
      <section className="birthday-list-cntr">
        {!list.length ? (
          <p>No candles to blow out today</p>
        ) : (
          list.map((item) => {
            const daysLeft = getDOB(item.dob);
            const color =
              daysLeft === 0 ? "green" : daysLeft < 0 ? "gray" : "violet";
            return (
              <Fragment key={item.id}>
                <section
                  onClick={() => showCompleteDetail(item)}
                  style={{ cursor: "pointer" }}
                  className={
                    displayAns?.includes(item.id) ? "full-details-section" : ""
                  }
                >
                  <div>
                    <img src={item.image} alt={`${item.name}'s profile`} />
                    {!displayAns?.includes(item.id) && (
                      <>
                        <h3>{item.name}</h3>
                        <p>{dayjs(item.dob).format("DD MMM YYYY")}</p>
                      </>
                    )}
                  </div>
                  {displayAns?.includes(item.id) && (
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
                      <h5>{`Relationship: ${item.relation}`}</h5>
                      {item.email && <p>{`Mail Id: ${item.email}`}</p>}
                      {item.phoneNo && <p>{`Contact Info: ${item.phoneNo}`}</p>}
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
