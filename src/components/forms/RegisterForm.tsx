import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { capitalizeFirstLetter } from "#src/utils/stringUtils.ts";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
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
      <Box className="mb-5">
        <TextField
          label="Full Name"
          error={!!errors.fullName}
          type="text"
          className="w-full"
          {...register("fullName")}
          helperText={
            errors.fullName &&
            capitalizeFirstLetter(errors.fullName.message || "")
          }
        />
      </Box>

      <Box className="mb-5">
        <TextField
          label="Email"
          error={!!errors.email}
          type="email"
          className="w-full"
          {...register("email")}
          helperText={
            errors.email &&
            capitalizeFirstLetter(errors.email.message || "")
          }
        />
      </Box>

      <Box className="mb-5">
        <TextField
          label="Password"
          error={!!errors.password}
          type="password"
          className="w-full"
          {...register("password")}
          helperText={
            errors.password &&
            capitalizeFirstLetter(errors.password.message || "")
          }
        />
      </Box>

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
