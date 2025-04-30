import { useCallback, useEffect, useState } from "react";
import { DATA, OPTIONS } from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import { Download, UserPlus } from "react-feather";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import { FilterDateFormatter } from "./helper";

export const BirthdayListComp = () => {
  const [selected, setSelected] = useState(OPTIONS[0]);
  const [list, setList] = useState(DATA);

  const timelineSelected = useCallback(() => {
    const today = dayjs();
    let filteredList = null;

    if (selected === OPTIONS[1]) {
      filteredList = [...DATA].filter(
        (item) => FilterDateFormatter("MM-DD", today, dayjs(item.dob))
      );
    } else if (selected === OPTIONS[2]) {
      const nextDay = today.add(1, "day");
      filteredList = [...DATA].filter(
        (item) => FilterDateFormatter("MM-DD", nextDay, dayjs(item.dob))
      );
    } else if (selected === OPTIONS[3]) {
      filteredList = [...DATA].filter(
        (item) => FilterDateFormatter("MM", today, dayjs(item.dob))
      );
    } else if (selected === OPTIONS[4]) {
      const nextMonth = today.add(1, "month");
      filteredList = [...DATA].filter(
        (item) => FilterDateFormatter("MM", nextMonth, dayjs(item.dob))
      );
    }
    setList(filteredList ?? DATA);
  }, [selected]);

  useEffect(() => {
    timelineSelected({ target: { selected: "today" } });
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
          <UserPlus />
        </Tippy>
        <Tippy content="Load Sample Data">
          <Download />
        </Tippy>
      </section>
      {!list.length ? (
        <p>No birthdays :(</p>
      ) : (
        list.map((item) => {
          return (
            <section key={item.id}>
              <img src={item.image} alt="profile pic" />
              <h3>{item.name}</h3>
              {/* <p>{`${moment(dayjs(item.dob)).format('DD MMM yyyy')}`}</p> */}
            </section>
          );
        })
      )}
    </main>
  );
};
