import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  applicationType: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  aadharNumber: {
    type: String,
    required: true,
  },

  images: [
    {
      frontImage: {
        type: String,
        required: true,
      },
      backImage: {
        type: String,
        required: true,
      },
    },
  ],

  payment: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.models.user || new mongoose.model("user", userSchema);

export default userModel;
