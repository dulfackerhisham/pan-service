import React, { useRef, useState } from "react";
import { Upload } from "lucide-react"; // Ensure correct import for the icon

const FileUpload = ({ title, onFileChange}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile)
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileChange(droppedFile)
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Trigger the file input click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-3 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick} // Only handle click here
      >
        <input
          type="file"
          name="file"
          className="hidden" // Keep the file input hidden
          onChange={handleFileChange}
          ref={fileInputRef} // Ref to control file input
        />
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-1 text-xs text-gray-600">
          {file ? file.name : "Upload a File"}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Drag and drop"}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
