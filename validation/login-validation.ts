import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required(`Email is required`).email(`Email is not valid`),
  password: yup
    .string()
    .required(`Password is required`)
    .min(8, (chars) => `Password must be at least ${chars.min} characters`),
});
