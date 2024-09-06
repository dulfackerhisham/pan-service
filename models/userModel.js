import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  applicationType: {
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

  phoneNumber: {
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

const userModel = new mongoose.model('user',userSchema)

export default userModel
