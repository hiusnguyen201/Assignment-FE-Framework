import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1 className="text-center">Home</h1>
      <Link className="underline hover:text-blue-500" to="/login">
        Go to Login Page
      </Link>
      <br />
      <Link className="underline hover:text-blue-500" to="/register">
        Go to Register Page
      </Link>
    </>
  );
}
