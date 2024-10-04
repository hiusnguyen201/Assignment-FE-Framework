import { Avatar, IconButton, TextField } from "@mui/material";
import { useState } from "react";

type AvatarFieldProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function AvatarField({
  width = 64,
  height = 64,
  className = "",
}: AvatarFieldProps) {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  return (
    <IconButton className={"p-0 " + className} component="label">
      <Avatar sx={{ width, height }} src={avatarSrc}></Avatar>
      <TextField
        type="file"
        hidden
        onChange={(e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setAvatarSrc(url);
          }
        }}
      />
    </IconButton>
  );
}
