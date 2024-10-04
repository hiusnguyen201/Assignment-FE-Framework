import { useForm } from "react-hook-form";
import { useState, ReactNode, Fragment, memo } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { capitalizeFirstLetter } from "#src/utils/stringUtils";
import FormModalLayout from "./FormModalLayout";
import { Gender, PasswordNotice } from "#src/constants";
import useScreen from "#src/hooks/useScreen";
import { AvatarField } from "#src/components/fields";

type ModalProps = {
  children: ReactNode;
};

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .trim()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "")
      .nullable(),
    gender: yup.string().nullable(),
    role: yup.string().required(),
    passwordNotice: yup.boolean().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default memo(function CreateUserFormModal({
  children,
}: ModalProps) {
  const { isMobile } = useScreen();

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
          <PersonAddIcon /> Create User
        </Typography>
      }
      rightHeaderAction={
        <Button
          disabled={!isValid}
          variant="contained"
          className="normal-case"
        >
          Create
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
            Basic Information
          </Typography>
          <CardContent className="p-0">
            <Box className="flex flex-col sm:flex-row gap-5">
              <AvatarField
                className="mx-5 sm:self-start"
                width={120}
                height={120}
              />
              <Box className="flex-grow w-full">
                <Box className="mb-4">
                  <TextField
                    required
                    label="Name"
                    error={!!errors.name}
                    type="text"
                    className="w-full"
                    {...register("name")}
                    helperText={
                      errors.name &&
                      capitalizeFirstLetter(errors.name.message || "")
                    }
                  />
                </Box>

                <Box className="mb-4">
                  <TextField
                    required
                    label="Email Address"
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

                <Box className="mb-4">
                  <TextField
                    label="Phone Number"
                    error={!!errors.phone}
                    type="tel"
                    className="w-full"
                    {...register("phone")}
                    helperText={
                      errors.phone &&
                      capitalizeFirstLetter(errors.phone.message || "")
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box className="mb-4">
              <FormControl fullWidth>
                <FormLabel id="gender-group-label">Gender</FormLabel>
                <RadioGroup
                  {...register("gender")}
                  row={!isMobile}
                  aria-labelledby="gender-group-label"
                  name="row-radio-gender-group"
                >
                  {Object.values(Gender).map((gender) => {
                    return (
                      <FormControlLabel
                        key={gender}
                        value={gender}
                        control={<Radio />}
                        label={gender}
                      />
                    );
                  })}
                </RadioGroup>
                {errors.gender && (
                  <FormHelperText>
                    {capitalizeFirstLetter(errors.gender.message || "")}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box className="mb-4">
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role *</InputLabel>
                <Select
                  required
                  label="role"
                  error={!!errors.role}
                  {...register("role")}
                  id="role-select"
                  labelId="role-select-label"
                  value={""}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                </Select>
                {errors.role && (
                  <FormHelperText>
                    {capitalizeFirstLetter(errors.role.message || "")}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* General */}
        <Card className="px-6 pt-6 pb-4 border border-gray-200 mb-6">
          <Typography
            variant="h2"
            component="h2"
            className="text-3xl mb-6"
          >
            General
          </Typography>
          <CardContent className="p-0">
            <Box className="mb-4">
              <FormControl fullWidth>
                <FormLabel id="passwordNotice-group-label">
                  Password Notice (Generated by system)
                </FormLabel>
                <RadioGroup
                  {...register("passwordNotice")}
                  aria-labelledby="passwordNotice-group-label"
                  name="radio-passwordNotice-group"
                >
                  {Object.values(PasswordNotice).map((passwordNotice) => {
                    return (
                      <FormControlLabel
                        key={passwordNotice}
                        value={passwordNotice}
                        control={<Radio />}
                        label={passwordNotice}
                      />
                    );
                  })}
                </RadioGroup>
                {errors.passwordNotice && (
                  <FormHelperText>
                    {capitalizeFirstLetter(
                      errors.passwordNotice.message || ""
                    )}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </form>
    </FormModalLayout>
  );
});
