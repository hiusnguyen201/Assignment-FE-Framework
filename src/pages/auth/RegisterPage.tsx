import { Card, Stack, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import RegisterForm from "#src/components/forms/RegisterForm.tsx";

const getNavLinkStyled = ({ isActive }: { isActive: boolean }): string =>
  `text-base px-3 py-4 block ${isActive ? "nav-link-active" : ""}`;

export default function RegisterPage() {
  return (
    <motion.div
      className="w-full max-w-xs mx-auto"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-[#f5f5f5]">
        <Stack className="mx-4" direction="row">
          <Typography variant="h6">
            <NavLink className={getNavLinkStyled} to="/login">
              Sign In
            </NavLink>
          </Typography>
          <Typography variant="h6">
            <NavLink className={getNavLinkStyled} to="/register">
              Sign Up
            </NavLink>
          </Typography>
        </Stack>

        <Card className="p-7">
          <RegisterForm />
          <Link className="text-center block text-red-500" to="/login">
            I have an Account?
          </Link>
        </Card>
      </Card>
    </motion.div>
  );
}
