import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Bell, X } from "react-feather";
import { MESSAGES } from "./Constants";

export const Modal = ({
  headerName,
  onClose,
  children,
  alert,
  width,
  minWidth,
}) => {
  const [showAlertMsg, setAlertMsg] = useState(false);
  
  return createPortal(
    <div className="transparent-overlay">
      <div
        className="portal-overlay"
        style={{ width: width, minWidth: minWidth }}
      >
        <h2 className="modal-header">
          {headerName}{" "}
          {alert && (
            <Bell
              className="alert-info"
              onClick={() => setAlertMsg(!showAlertMsg)}
            />
          )}
          {showAlertMsg && (
            <span className="session-msg">{MESSAGES.WARN_MSG}</span>
          )}
          <span>
            <X onClick={() => onClose(false)} className="close-modal" />
          </span>
        </h2>
        <div className="card">{children}</div>
      </div>
    </div>,
    document.body
  );
};
