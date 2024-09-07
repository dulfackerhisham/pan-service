import React from "react";
import userModel from "@models/userModel";
import { connectDB } from "@config/databse";
import Image from "next/image";

const UserList = async () => {
    await connectDB(); 
  
    try {
      const users = await userModel.find(); 
  
      return (
        <>
          <table>
            <thead>
              <tr>
                <th>Application Type</th>
                <th>Title</th>
                <th>User Name</th>
                <th>Date of Birth</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Aadhar Number</th>
                <th>Front Image</th>
                <th>Back Image</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.applicationType}</td>
                  <td>{user.title}</td>
                  <td>{user.fullName}</td>
                  <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.aadharNumber}</td>
                  <td>
                    <Image
                      src={user.images[0].frontImage}
                      alt="Front Image"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>
                    <Image
                      src={user.images[0].backImage}
                      alt="Back Image"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{user.payment ? "Paid" : "Not Paid"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } catch (error) {
      console.error("Error fetching users: ", error);
      return <div>Error loading users.</div>;
    }
  };
  
  export default UserList;
