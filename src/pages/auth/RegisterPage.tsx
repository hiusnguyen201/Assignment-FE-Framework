import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RegisterForm } from "#src/components/forms/auth";

export default function RegisterPage() {
  return (
    <motion.div
      className="w-full max-w-xs mx-auto"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-7 rounded-lg">
        <Typography
          variant="h4"
          className="text-center text-blue-500 mb-5 font-bold"
        >
          Register
        </Typography>

        <RegisterForm />

        <Link className="text-center block text-red-500" to="/login">
          I have an Account?
        </Link>
      </Card>
    </motion.div>
  );
}
