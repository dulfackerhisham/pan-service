import React from "react";
import FileUpload from "./FileUpload";

const PanFileUploadContainer = ({ selectedApplicationType, onFileChange }) => {
  return (
    <div className="container grid grid-cols-2 gap-4 mx-auto p-2">
      <FileUpload
        title={
          selectedApplicationType === "New PAN Card"
            ? "Aadhar front image"
            : "Pan card front image"
        }
        onFileChange={(file) => onFileChange("front", file)}
      />
      <FileUpload
        title={
          selectedApplicationType === "New PAN Card"
            ? "Aadhar back image"
            : "Pan card back image"
        }
        onFileChange={(file) => onFileChange("back", file)}
      />
    </div>
  );
};

export default PanFileUploadContainer;
