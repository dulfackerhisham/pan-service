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
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [DOB, setDOB] = useState("");
  const [aadhar, setAadhar] = useState(undefined);
  const [files, setFiles] = useState({ front: null, back: null });


  const handleFileChange = (side, file) => {
    setFiles((prevFiles) => ({ ...prevFiles, [side]: file }));
  }

  const formData = {
    applicationType: selectedApplicationType,
    title: selectedTitle,
    fullName: fullName,
    mobileNumber: phoneNumber,
    email: email,
    dateOfBirth: DOB,
    aadharNumber: aadhar,
    files:files
  };

  const handleSubmit = async () => {
    console.log("file is - ",formData.files);
    
    const result = await fetch("/api/formSubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await result.json();
    console.log("response - ", response);
  };
  
  return (
    <div className="w-9/12 mx-auto">
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
        <PanFileUploadContainer  selectedApplicationType={selectedApplicationType} onFileChange={handleFileChange}  />
      </div>
    )}
    <div className="flex justify-center items-center">
      <button
        onClick={handleSubmit}
        className="px-2 py-1 w-36 rounded-md bg-header-color border text-white text-xs border-gray-200"
      >
        Submit
      </button>
    </div>
  </div>
  );
};

export default PanApplicationForm;
