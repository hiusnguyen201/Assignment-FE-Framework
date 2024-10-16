import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ManageAccounts as ManageAccountsIcon } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { capitalizeFirstLetter } from "#src/utils/stringUtils";
import FormModalLayout from "./parts/FormModalLayout";

type ModalProps = {
  children: ReactNode;
};

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().nullable(),
    key: yup.string().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function CreateUserFormModal({ children }: ModalProps) {
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
    <FormModalLayout
      anchorEl={children}
      title={
        <Typography
          className="flex items-center gap-1 font-medium"
          variant="h6"
        >
          <ManageAccountsIcon /> Add Permission
        </Typography>
      }
      rightHeaderAction={
        <Button
          disabled={!isValid}
          variant="contained"
          className="normal-case"
        >
          Add
        </Button>
      }
    >
      <form onSubmit={onSubmit}>
        {/* Basic Information */}
        <Card className="px-6 pt-6 pb-4 border border-gray-200 mb-6">
          <Typography
            variant="h2"
            component="h2"
            className="text-3xl mb-6"
          >
            Information
          </Typography>

          <CardContent className="p-0">
            <TextField
              required
              label="Name"
              error={!!errors.name}
              type="text"
              className="w-full mb-4"
              {...register("name")}
              helperText={
                errors.name &&
                capitalizeFirstLetter(errors.name.message || "")
              }
            />

            <TextField
              type="text"
              className="w-full mb-4"
              multiline
              rows={4}
              label="Description"
              error={!!errors.description}
              {...register("description")}
              helperText={
                errors.description &&
                capitalizeFirstLetter(errors.description.message || "")
              }
            />

            <TextField
              required
              type="text"
              className="w-full mb-4"
              label="Key"
              error={!!errors.key}
              {...register("key")}
              helperText={
                errors.key &&
                capitalizeFirstLetter(errors.key.message || "")
              }
            />
          </CardContent>
        </Card>
      </form>
    </FormModalLayout>
  );
}
