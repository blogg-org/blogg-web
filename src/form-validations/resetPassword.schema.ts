import * as yup from "yup";

export const resetPasswordSchema = yup.object({
    newPassword: yup
        .string()
        .required("password is required.")
        .matches(/^(?=.*[A-Z]).+$/, "at least one capital letter (A-Z).")
        .matches(/^(?=.*[a-z]).+$/, "at least one small letter (a-z).")
        .matches(/^(?=.*[0-9]).+$/, "at least one digit (0-9).")
        .matches(
            /^(?=.*[!@#$%^&*(){}[\]_+:;<>-]).+$/,
            "at least one symbol !@#$%^&*()_+{}[]:;<>-"
        )
        .min(8, "minimum 8 characters.")
        .max(20, "maximum 20 characters.")
        .trim()
        .default(""),
});
