import { useRef, useState } from "react";
import { LazyLoadIcons } from "./LazyLoadIcons";
import useClickOutside from "./useClickOutside";

export const Dropdown = ({ label, options, selected, setSelected }) => {
  const boxRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  useClickOutside(boxRef, () => setOpen(false));

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="dropdown" ref={boxRef}>
      {label && <label>{label}</label>}
      <div className="dropdown-header" onClick={() => setOpen(!isOpen)}>
        {selected}{" "}
        <span className="arrow-dropdown">
          {isOpen ? (
            <LazyLoadIcons name="chevron_up" />
          ) : (
            <LazyLoadIcons name="chevron_down" />
          )}
        </span>
      </div>
      {isOpen && (
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
