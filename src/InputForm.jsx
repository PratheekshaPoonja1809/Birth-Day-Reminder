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

  const changeInputData = () => {};

  const handleBlur = () => {};

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
            type="text"
            value={inputs.name}
            onChange={changeInputData}
            handleBlur={handleBlur}
            maxlength="20"
          />
          <InputFields
            label="Mail Id"
            type="text"
            value={inputs.name}
            onChange={changeInputData}
            handleBlur={handleBlur}
            maxlength="20"
          />
          <InputFields
            label="DOB"
            type="date"
            value={inputs.name}
            onChange={changeInputData}
            handleBlur={handleBlur}
          />
          <InputFields
            label="Phone Number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            value={inputs.name}
            onChange={changeInputData}
            handleBlur={handleBlur}
          />
          <InputFields
            label="Relation"
            type="text"
            value={inputs.name}
            onChange={changeInputData}
            handleBlur={handleBlur}
            maxlength="20"
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
