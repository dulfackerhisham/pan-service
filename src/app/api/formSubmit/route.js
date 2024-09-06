const { NextResponse } = require("next/server");
import cloudinary from "cloudinary";

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
  console.log("front image - ", frontImage);
  console.log("back image - ", backImage);

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
      cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" }, 
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(buffer); 
    });
  };

  // Upload both images to Cloudinary
  const frontImageUrl = await uploadToCloudinary(frontImage);
  const backImageUrl = await uploadToCloudinary(backImage);

  console.log(frontImageUrl);
  console.log(backImageUrl);
  
  

  console.log("body in api route - ",body);

  return NextResponse.json({ message: "success", frontImageUrl:frontImageUrl, backImageUrl:backImageUrl });
};
