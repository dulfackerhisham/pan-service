import React from "react";
import "../app/globals.css";

const PanApplicationDOB = ({ DOB, setDOB }) => {
  return (
    <div className="w-52 m-4">
      <h1 className="text-[8px] font-light">
        Date of Birth <span className="text-red-500">*</span>
      </h1>
      <div>
        <input
          type="date"
          name="DOB"
          value={DOB}
          onChange={(e) => setDOB(e.target.value)}
          className="border border-gray-300 w-32 rounded-md font-light px-2 py-1 text-[8px] leading-3 cursor-pointer outline-none"
          required
        />
      </div>
    </div>
  );
};

export default PanApplicationDOB;
