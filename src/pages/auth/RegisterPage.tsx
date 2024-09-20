import {
  Card,
  Stack,
  Typography,
  Box,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function getNavLinkStyled({ isActive }: { isActive: boolean }): string {
  return `text-base px-3 py-4 block ${isActive ? "nav-link-active" : ""}`;
}

export default function LoginPage() {
  return (
    <motion.div
      className="w-full max-w-xs mx-auto"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-[#f5f5f5]">
        <Stack className="mx-4" direction={"row"}>
          <Typography
            typography={"h6"}
            children={
              <NavLink className={getNavLinkStyled} to={"/login"}>
                Sign In
              </NavLink>
            }
          />
          <Typography
            typography={"h6"}
            children={
              <NavLink className={getNavLinkStyled} to={"/register"}>
                Sign Up
              </NavLink>
            }
          />
        </Stack>

        <Card className="p-7">
          <Box className="mb-5">
            <InputLabel className="mb-1 text-blue-500">
              Full Name
            </InputLabel>
            <TextField
              type="text"
              className="w-full"
              placeholder="Full Name..."
            />
          </Box>
          <Box className="mb-5">
            <InputLabel className="mb-1 text-blue-500">Email</InputLabel>
            <TextField
              type="email"
              className="w-full"
              placeholder="Email..."
            />
          </Box>
          <Box className="mb-5">
            <InputLabel className="mb-1 text-blue-500">
              Password
            </InputLabel>
            <TextField
              type="password"
              className="w-full"
              placeholder="Password..."
            />
          </Box>
          <Button
            variant="contained"
            className="mb-3 normal-case w-full py-2"
          >
            Sign Up
          </Button>

          <Link className="text-center block text-red-500" to={"/login"}>
            I have an Account ?
          </Link>
        </Card>
      </Card>
    </motion.div>
  );
}
