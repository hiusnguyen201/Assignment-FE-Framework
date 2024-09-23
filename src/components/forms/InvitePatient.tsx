import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Modal,
  Divider,
  Card,
  Typography,
  Fade,
  Backdrop,
  TextField,
  IconButton,
  Badge,
  Stack,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "#src/utils/stringUtils";

export type TInvitePatient = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function InvitePatient({ open, setOpen }: TInvitePatient) {
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Card className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] rounded-md">
          <Stack direction="row" justifyContent="space-between">
            <Typography
              className="py-3 px-4"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Invite new patient
            </Typography>
            <Stack className="items-center justify-center mr-4">
              <IconButton className="h-[auto]" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Divider />

          <form className="p-4" onSubmit={onSubmit}>
            <TextField
              required
              label="Patient Email"
              error={!!errors.email}
              type="email"
              className="w-full"
              {...register("email")}
              helperText={
                errors.email &&
                capitalizeFirstLetter(errors.email.message || "")
              }
            />
          </form>
        </Card>
      </Fade>
    </Modal>
  );
}
