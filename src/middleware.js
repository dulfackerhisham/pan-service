import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  applicationType: z.string().min(1, "Application type is required"),
  title: z.string().min(1, "Title is required"),
  fullName: z
    .string()
    .min(3, "Full name must contain at least three letters")
    .max(30, "Full name should only contain a maximum of 30 letters")
    .regex(/^[a-zA-Z\s]+$/, "Full name must contain only letters"),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .length(10, "Mobile number must be exactly 10 digits long")
    .regex(/^[0-9]+$/, "Mobile number must contain only digits"),
  email: z.string().email("Invalid email"),
  dateOfBirth: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Date of birth must be a valid date.",
    })
    .refine((val) => val <= new Date(), {
      message: "Date of birth cannot be in the future.",
    }),
  aadharNumber: z
    .string()
    .length(12, "Aadhar number must be exactly 12 digits long")
    .regex(/^[0-9]+$/, "Aadhar number must contain only digits")
    .min(1, "Aadhar number is required"),
});

export const middleware = async (req) => {
  const formData = await req.formData();

  const body = Object.fromEntries(formData.entries());
  
  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      path: err.path,
      message: err.message,
    }));
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/api/formSubmit",
};
