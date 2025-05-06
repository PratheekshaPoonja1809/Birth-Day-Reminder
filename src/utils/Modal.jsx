import React, { useState } from "react";
import { createPortal } from "react-dom";
import { MESSAGES } from "./Constants";
import { LazyLoadIcons } from "./LazyLoadIcons";

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
            <LazyLoadIcons
              name="bell"
              className="alert-info"
              onClick={() => setAlertMsg(!showAlertMsg)}
            />
          )}
          {showAlertMsg && (
            <span className="session-msg">{MESSAGES.WARN_MSG}</span>
          )}
          <span>
            <LazyLoadIcons
              name="close"
              onClick={onClose}
              className="close-modal"
            />
          </span>
        </h2>
        <div className="card">{children}</div>
      </div>
    </div>,
    document.body
  );
};
