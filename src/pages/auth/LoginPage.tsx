import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center">Login</h1>
      <Link className="underline hover:text-blue-500" to="/">
        Go to Home Page
      </Link>
    </>
  );
}
