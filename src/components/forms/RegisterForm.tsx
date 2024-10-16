import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { capitalizeFirstLetter } from "#src/utils/stringUtils";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      alert("Your application is updated.");
    } catch (error) {
      alert("Submission has failed.");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Full Name"
        error={!!errors.fullName}
        type="text"
        className="w-full mb-4"
        {...register("fullName")}
        helperText={
          errors.fullName &&
          capitalizeFirstLetter(errors.fullName.message || "")
        }
      />

      <TextField
        label="Email"
        error={!!errors.email}
        type="email"
        className="w-full mb-4"
        {...register("email")}
        helperText={
          errors.email && capitalizeFirstLetter(errors.email.message || "")
        }
      />

      <TextField
        label="Password"
        error={!!errors.password}
        type="password"
        className="w-full mb-4"
        {...register("password")}
        helperText={
          errors.password &&
          capitalizeFirstLetter(errors.password.message || "")
        }
      />

      <TextField
        label="Confirm password"
        error={!!errors.confirmPassword}
        type="password"
        className="w-full mb-4"
        {...register("confirmPassword")}
        helperText={
          errors.confirmPassword &&
          capitalizeFirstLetter(errors.confirmPassword.message || "")
        }
      />

      <Button
        disabled={!isValid}
        type="submit"
        variant="contained"
        className="mb-3 normal-case w-full py-2"
      >
        Sign Up
      </Button>
    </form>
  );
}
