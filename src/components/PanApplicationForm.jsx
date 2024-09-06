"use client";

import { useState } from "react";
import PanApplicationTitle from "./PanApplicationTitle";
import PanApplicationType from "./PanApplicationType";
import PanApplicationPhoneNumber from "./PanApplicationPhoneNumber";
import PanApplicationEmail from "./PanApplicationEmail";
import PanApplicationFullName from "./PanApplicationFullName";
import PanApplicationDOB from "./PanApplicationDOB";
import PanApplicationAadhar from "./PanApplicationAadhar";
import PanFileUploadContainer from "./PanFileUploadContainer";

const PanApplicationForm = () => {
  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [DOB, setDOB] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [files, setFiles] = useState({ front: null, back: null });
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");

  const handleFileChange = (side, file) => {
    setFiles((prevFiles) => ({ ...prevFiles, [side]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("applicationType", selectedApplicationType);
    formData.append("title", selectedTitle);
    formData.append("fullName", fullName);
    formData.append("mobileNumber", phoneNumber);
    formData.append("email", email);
    formData.append("dateOfBirth", DOB);
    formData.append("aadharNumber", aadhar);

    if (files.front) formData.append("front", files.front);
    if (files.back) formData.append("back", files.back);

    try {
      const result = await fetch("/api/formSubmit", {
        method: "POST",
        body: formData,
      });

      const response = await result.json();
      setBackImage(response.backImageUrl);
      setFrontImage(response.frontImageUrl);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-9/12 mx-auto"
    >
      <PanApplicationType
        selectedApplicationType={selectedApplicationType}
        setSelectedApplicationType={setSelectedApplicationType}
      />
      <PanApplicationTitle
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
      />
      <PanApplicationFullName fullName={fullName} setFullName={setFullName} />
      <PanApplicationPhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <div className="grid grid-cols-3 mb-4">
        <PanApplicationEmail email={email} setEmail={setEmail} />
        <PanApplicationDOB DOB={DOB} setDOB={setDOB} />
        <PanApplicationAadhar aadhar={aadhar} setAadhar={setAadhar} />
      </div>
      {selectedApplicationType && (
        <div>
          <PanFileUploadContainer
            selectedApplicationType={selectedApplicationType}
            onFileChange={handleFileChange}
          />
        </div>
      )}

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="px-2 py-1 w-36 rounded-md bg-header-color border text-white text-xs border-gray-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PanApplicationForm;
