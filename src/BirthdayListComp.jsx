import { useCallback, useEffect, useState } from "react";
import { DATA, OPTIONS } from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import { Download, UserPlus } from "react-feather";
import Tippy from "@tippyjs/react";
import dayjs from "dayjs";
import { FilterDateFormatter } from "./helper";

export const BirthdayListComp = () => {
    const [selected, setSelected] = useState(OPTIONS[1]);
    const [dataSource, setDataSource] = useState([]);
    const [list, setList] = useState([]);
  
    const loadSampleData = () => {
      setDataSource(DATA); 
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
        case OPTIONS[4]:
          formatter = "MM";
          compareDate = selected === OPTIONS[4] ? today.add(1, "month") : today;
          break;
        default:
          break;
      }
  
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
            <UserPlus />
          </Tippy>
          <Tippy content="Load Sample Data">
            <Download onClick={loadSampleData} />
          </Tippy>
        </section>
        <section className="birthday-list-cntr">
          {!list.length ? (
            <p>No candles to blow out today</p>
          ) : (
            list.map((item) => (
              <section key={item.id}>
                <img src={item.image} alt={`${item.name}'s profile`} />
                <h3>{item.name}</h3>
                <p>{dayjs(item.dob).format("DD MMM YYYY")}</p>
              </section>
            ))
          )}
        </section>
      </main>
    );
  };