import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().required(`Email is required`).email(`Email is not valid`),
  name: yup
    .string()
    .required(`Name is required`)
    .matches(/^[a-z- \xC0-\xFF]+$/i, `Name is not valid`)
    .min(2, (chars) => `Name must be at least ${chars.min} characters`),
  password: yup
    .string()
    .required(`Password is required`)
    .min(8, (chars) => `Password must be at least ${chars.min} characters`),
});
