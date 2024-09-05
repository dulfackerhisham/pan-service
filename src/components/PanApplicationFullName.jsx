import React from 'react'

const PanApplicationFullName = ({fullName, setFullName}) => {
  return (
    <div className="w-36 m-4">
    <h1 className="text-[8px] font-light">
      Full Name <span className="text-red-500">*</span>
    </h1>
    <input
      type="text"
      name="fullname"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      required
      className="border border-gray-300 w-full rounded-md font-light px-2 py-1 text-[8px] leading-3 cursor-pointer outline-none"
    />
  </div>
  )
}

export default PanApplicationFullName