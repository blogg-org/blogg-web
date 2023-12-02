import * as yup from "yup";

export const verifyEmailSchema = yup.object({
    email: yup
        .string()
        .required("email is required.")
        .email("enter valid email.")
        .matches(
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "not valid email."
        )
        .trim()
        .default(""),
});
