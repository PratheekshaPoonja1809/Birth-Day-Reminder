import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Bell, X } from "react-feather";
import { WARN_MSG } from "./Constants";

export const Modal = ({ headerName, onClose, children }) => {
  const [showAlertMsg, setAlertMsg] = useState(false);
  return createPortal(
    <div className="transparent-overlay">
      <div className="portal-overlay">
        <h2 className="modal-header">
          {headerName}{" "}
          <Bell
            className="alert-info"
            onClick={() => setAlertMsg(!showAlertMsg)}
          />
          {showAlertMsg && <span className="session-msg">{WARN_MSG}</span>}
          <span>
            <X onClick={() => onClose(false)} />
          </span>
        </h2>
        <div className="card">{children}</div>
      </div>
    </div>,
    document.body
  );
};
