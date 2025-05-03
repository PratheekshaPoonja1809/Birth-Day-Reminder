import React, { useCallback, useEffect, useId, useState } from "react";
import PropTypes from "prop-types";

export const InputFields = (props) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const [isFirstFocus, setIsFirstFocus] = useState(!!props.value);

  const handleBlur = useCallback(() => {
    setIsFirstFocus(!!props.value);
  }, [props.value]);

  const inputChange = (e) => {
    const newValue = e.target;
    setIsFirstFocus(!!newValue.value);
    props.onChange(newValue);
  };

  useEffect(() => {
    handleBlur();
  }, [handleBlur]);

  return (
    <div className="input-field-section">
      <input {...props} onChange={inputChange} />
      {props.label && (
        <label
          htmlFor={inputId}
          className={isFirstFocus ? "fix-focus-top" : ""}
        >
          {props.label}
        </label>
      )}
      {props.haserror && <small className="error">{props.haserror}</small>}
    </div>
  );
};

InputFields.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  pattern: PropTypes.string,
};
