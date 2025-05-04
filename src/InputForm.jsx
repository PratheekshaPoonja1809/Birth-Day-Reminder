import { useState } from "react";
import { InputFields } from "./utils/InputFields";
import {
  INPUT_FORM_DATA,
  MESSAGES,
  PROFILE_PIC_TEXT,
  useSession,
} from "./utils/Constants";
import { Button } from "./utils/Button";
import { genrateUniqueID } from "./helper";
import { LazyLoadIcons } from "./utils/LazyLoadIcons";

export const InputForm = ({ onClose }) => {
  let [inputs, setInputs] = useState(INPUT_FORM_DATA);
  let [err, setErr] = useState(INPUT_FORM_DATA);
  const [image, setImage] = useState();
  const { setSession } = useSession();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        sessionStorage.setItem("uploadedImage", base64Image);
        setInputs((val) => ({ ...val, image: base64Image }));
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
        [name]: MESSAGES.ERR_NAME,
      }));
    if (name === "email" && !value.includes("@"))
      setErr((err) => ({ ...err, [name]: MESSAGES.ERR_MAIL }));
    if (name === "dob" && !value)
      setErr((err) => ({ ...err, [name]: MESSAGES.ERR_DOB }));
    if (name === "phoneNo" && value.length <= 11)
      setErr((err) => ({
        ...err,
        [name]: MESSAGES.ERR_PHONENO,
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
    const generateID = { ...inputs, id: genrateUniqueID() };
    setSession((prev) => [...prev, generateID]);
    onClose(false);
  };

  const getStyles = (showDOB) => {
    return {
      color: showDOB ? "#000" : "transparent",
    };
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
              <LazyLoadIcons
                name="close"
                onClick={clearImage}
                className="close-profile-pic"
                title="Close"
              />
            </>
          )}
          <label htmlFor="file-upload" className="custom-file-upload">
            {image ? PROFILE_PIC_TEXT.RENAME : PROFILE_PIC_TEXT.NEW}
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
            haserror={err.name}
          />
          <InputFields
            label="Mail Id"
            type="text"
            name="email"
            value={inputs.email}
            onChange={changeInputData}
            onBlur={handleBlur}
            maxLength="20"
            haserror={err.email}
          />
          <InputFields
            label="DOB"
            type="date"
            name="dob"
            value={inputs.dob ?? ""}
            onChange={changeInputData}
            onBlur={handleBlur}
            haserror={err.dob}
            style={getStyles(inputs.dob)}
            max={new Date().toISOString().split("T")[0]}
          />
          <InputFields
            label="Phone Number"
            type="tel"
            name="phoneNo"
            value={inputs.phoneNo ?? ""}
            onChange={changeInputData}
            onBlur={handleBlur}
            haserror={err.phoneNo}
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
