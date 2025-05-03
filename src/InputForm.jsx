import { useState } from "react";
import { InputFields } from "./utils/InputFields";
import { INPUT_FORM_DATA } from "./utils/Constants";
import { X } from "react-feather";
import { Button } from "./utils/Button";

export const InputForm = () => {
  let [inputs, setInputs] = useState(INPUT_FORM_DATA);
  let [err, setErr] = useState(INPUT_FORM_DATA);
  const [image, setImage] = useState(() => {
    const storedImage = sessionStorage.getItem("uploadedImage");
    return storedImage ? storedImage : null;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        sessionStorage.setItem("uploadedImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    sessionStorage.removeItem("uploadedImage");
  };

  const changeInputData = (e) => {
    const { name, value } = e;
    setErr((val) => ({ ...val, [name]: "" }));
    if (name === "phoneNo") {
      let x = value.replace(/\D/g, "").substring(0, 10);
      if (x.length > 6) {
        x = `${x.substring(0, 3)}-${x.substring(3, 6)}-${x.substring(6, 10)}`;
      } else if (x.length > 3) {
        x = `${x.substring(0, 3)}-${x.substring(3, 6)}`;
      }
      setInputs((val) => ({ ...val, [name]: x }));
    } else {
      setInputs((val) => ({ ...val, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value.length <= 2)
      setErr((err) => ({
        ...err,
        [name]: "! Minimum of 3 characters",
      }));
    if (name === "email" && !value.includes("@"))
      setErr((err) => ({ ...err, [name]: "! Please enter valid email ID" }));
    if (name === "phoneNo" && value.length <=11)
      setErr((err) => ({
        ...err,
        [name]: "! Right format: 123-456-7890",
      }));
  };

  const isDisabledBtn = Object.values(err).some(
    (errMessage) => errMessage !== ""
  );

  const resetForm = () => {
    setInputs(INPUT_FORM_DATA);
    setErr(INPUT_FORM_DATA);
  };

  const submitForm = (e) => {
    e.preventDefault();
    alert(`Hello user ${inputs.name}. Your email id is ${inputs.email}`);
  };
  
  return (
    <>
      <form onSubmit={submitForm} id="form-validate">
        <div className="profile-details-pic">
          {image && (
            <>
              <img
                src={image}
                alt="ProfilePicture"
                className="profile_picture"
              />
              <X
                onClick={clearImage}
                className="close-profile-pic"
                title="Close"
              />
            </>
          )}
          <label htmlFor="file-upload" className="custom-file-upload">
            {image ? "Replace Profile Pic" : "Choose Profile Pic"}
          </label>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleFileChange}
            style={{ display: "none" }}
            name="profilePic"
          />
        </div>
        <div className="form-inputs-container">
          <InputFields
            label="Name"
            name="name"
            type="text"
            value={inputs.name}
            onChange={changeInputData}
            onBlur={handleBlur}
            maxLength="20"
            hasError={err.name}
          />
          <InputFields
            label="Mail Id"
            type="text"
            name="email"
            value={inputs.email}
            onChange={changeInputData}
            onBlur={handleBlur}
            maxLength="20"
            hasError={err.email}
          />
          <InputFields
            label="DOB"
            type="date"
            name="dob"
            value={inputs.dob}
            onChange={changeInputData}
            onBlur={handleBlur}
            hasError={err.dob}
          />
          <InputFields
            label="Phone Number"
            type="tel"
            name="phoneNo"
            value={inputs.phoneNo}
            onChange={changeInputData}
            onBlur={handleBlur}
            hasError={err.phoneNo}
          />
          <InputFields
            label="Relation"
            type="text"
            name="relationship"
            value={inputs.relationship}
            onChange={changeInputData}
            onBlur={handleBlur}
            maxLength="20"
          />
          <div>
            <Button
              type="submit"
              text="Submit"
              disabled={isDisabledBtn}
              className="profile-details-button"
            />
            <Button
              type="reset"
              text="Reset"
              onClick={resetForm}
              className="profile-details-button"
            />
          </div>
        </div>
      </form>
    </>
  );
};
