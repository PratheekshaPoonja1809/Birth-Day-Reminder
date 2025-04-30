import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export const Dropdown = ({ label, options,selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      {label && <label>{label}</label>}
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {selected}{" "}
        <span className="arrow-dropdown">
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      {open && (
        <ul className="dropdown-list">
          {options.map((opt, i) => (
            <li key={i} onClick={() => handleSelect(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
