import { useState } from "react";
import { OPTIONS } from "./utils/Constants";
import { Dropdown } from "./utils/Dropdown";
import { UserPlus } from "react-feather";
import Tippy from "@tippyjs/react";

export const BirthdayListComp = () => {
  const [selected, setSelected] = useState(OPTIONS[0]);
  return (
    <main className="main-container">
      <Dropdown
        options={OPTIONS}
        label="Upcoming B'Day:"
        selected={selected}
        setSelected={setSelected}
      />
      <section className="menu-icons">
        <Tippy content="Add Contacts">
          <UserPlus />
        </Tippy>
      </section>
    </main>
  );
};
