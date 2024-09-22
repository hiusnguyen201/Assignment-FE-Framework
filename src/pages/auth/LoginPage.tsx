import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "#src/components/forms/LoginForm";

export default function LoginPage() {
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
          Login
        </Typography>

        <LoginForm />

        <Link className="text-center block text-red-500" to="/register">
          Don't have an account? Sign up
        </Link>
      </Card>
    </motion.div>
  );
}
