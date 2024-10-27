import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required."),
  username: z.string().min(1, "Username is required."),
  email: z.string().email(),
  phone: z.string().min(10, "Phone should have at least 10 characters."),
  address: z.object({
    street: z.string().min(1, "Street is required."),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required."),
    zipcode: z.string().optional(),
    geo: z
      .object({
        lat: z.string().refine((val) => !isNaN(parseFloat(val)), {
          message: "Latitude must be a valid number.",
        }),
        lng: z.string().refine((val) => !isNaN(parseFloat(val)), {
          message: "Longitude must be a valid number.",
        }),
      })
      .optional(),
  }),
  website: z.string().url({ message: "Website must be a valid URL." }),
  company: z.object({
    name: z.string().min(1, "Company Name is required."),
    catchPhrase: z.string().optional(),
    bs: z.string().min(1, " Write brief description"),
  }),
});

export type User = z.infer<typeof UserSchema>;

export const AddUserSchema = UserSchema.omit({ id: true });

export type SortableKeys = keyof User;
