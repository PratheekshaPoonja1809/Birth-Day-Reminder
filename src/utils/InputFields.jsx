import React, { useCallback, useEffect, useId, useState } from "react";
import PropTypes from "prop-types";

export const InputFields = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
  isDisabled,
  maxLength,
  required,
  pattern,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [isFirstFocus, setIsFirstFocus] = useState(!!value);

  const handleBlur = useCallback(() => {
    setIsFirstFocus(!!value);
  }, [value]);

  const inputChange = (e) => {
    const newValue = e.target;
    setIsFirstFocus(!!newValue.value);
    onChange(newValue);
  };

  useEffect(() => {
    handleBlur();
  }, [handleBlur]);

  return (
    <div className="input-field-section">
      <input
        id={inputId}
        type={type}
        value={value}
        onBlur={handleBlur}
        onChange={inputChange}
        placeholder={placeholder}
        name={name}
        disabled={isDisabled}
        maxLength={maxLength}
        required={required}
        pattern={pattern || undefined}
      />
      {label && (
        <label
          htmlFor={inputId}
          className={isFirstFocus ? "fix-focus-top" : ""}
        >
          {label}
        </label>
      )}
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
