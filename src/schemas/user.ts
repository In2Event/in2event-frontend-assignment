import { z } from "zod";

const companySchema = z.object({
  name: z.string({
    required_error: "Company name is required",
  }),
  catchPhrase: z.string().optional(),
  bs: z.string().optional(),
});

const addressSchema = z.object({
  street: z.string(),
  suite: z.string().optional(),
  city: z.string(),
  zipcode: z.string().min(5, {
    message: "Zipcode is required and should have at least 4 characters.",
  }),
  geo: z.object({
    lat: z.string().refine((val) => !isNaN(parseFloat(val)), {
      message: "Latitude must be a valid number.",
    }),
    lng: z.string().refine((val) => !isNaN(parseFloat(val)), {
      message: "Longitude must be a valid number.",
    }),
  }),
});

export const addUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email address." }),
  address: addressSchema,
  phone: z
    .string()
    .min(10, { message: "Phone number should have at least 10 characters." }),
  website: z.string().url({ message: "Website must be a valid URL." }),
  company: companySchema,
});

export type AddUser = z.infer<typeof addUserSchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: addressSchema,
  website: z.string().url({ message: "Website must be a valid URL." }),
  company: companySchema,
});

export type User = z.infer<typeof UserSchema>;
