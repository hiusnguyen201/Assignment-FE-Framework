import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { capitalizeFirstLetter } from "#src/utils/stringUtils";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
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

      <Button
        disabled={!isValid}
        type="submit"
        variant="contained"
        className="mb-3 normal-case w-full py-2"
      >
        Sign In
      </Button>
    </form>
  );
}
