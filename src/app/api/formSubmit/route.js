const { NextResponse } = require("next/server");
import cloudinary from "cloudinary";
import userModel from "@models/userModel";
import { connectDB } from "@config/databse";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  const formData = await req.formData();
  const frontImage = formData.get("front");
  const backImage = formData.get("back");

  const body = Object.fromEntries(formData.entries());

  if (!frontImage || !backImage) {
    return NextResponse.json(
      { error: "Both front and back images is required" },
      { status: 400 }
    );
  }

  const uploadToCloudinary = async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        })
        .end(buffer);
    });
  };

  // Upload both images to Cloudinary
  const frontImageUrl = await uploadToCloudinary(frontImage);
  const backImageUrl = await uploadToCloudinary(backImage);

  const {
    applicationType,
    title,
    fullName,
    mobileNumber,
    email,
    dateOfBirth,
    aadharNumber,
  } = body;

  await connectDB();

  const userData = {
    applicationType,
    title,
    fullName,
    mobileNumber,
    email,
    dateOfBirth,
    aadharNumber,
    images: [
      {
        frontImage: frontImageUrl,
        backImage: backImageUrl,
      },
    ],
  };


  await userModel.insertMany([userData]);

  return NextResponse.json({
    message: "success",
  });
};
