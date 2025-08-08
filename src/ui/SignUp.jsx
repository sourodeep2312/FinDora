import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { useSignUp } from "../hooks/useSingup";
import toast from "react-hot-toast";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useSignUp({
    onSuccess: () => {
      navigate("/");
      toast.success("Sign up successfully");
    },
    onError: (err) => {
      setError(err.message);
      toast.error("Sign up failed, try again");
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    signup({ email, password });
    console.log("Passwords matched. Submitting...");
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  }
  console.log(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl text-center font-bold text-zinc-800 mb-8">
          Sign Up to FinDora
        </h1>
        <form className="flex flex-col  gap-6" onSubmit={handleSubmit}>
          {error && (
            <p className="text-lg text-center font-medium text-red-600">
              {error}
            </p>
          )}
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-zinc-800 mb-1">
              Fullname:
            </label>
            <input
              type="text"
              required
              placeholder="eg. Abhishek Kr Sharma"
              className=" border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-zinc-800 mb-1">
              Email:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="user@example.com"
              className=" border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-800 mb-1">
              Set Password: (Minimum 8 characters)
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={handlePassword}
              className=" border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-800 mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={handleConfirmPassword}
              className={` border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                error
                  ? "border-red-500 focus:ring-red-400"
                  : "border-zinc-300 focus:ring-emerald-500"
              }`}
            />
          </div>
          <Button>{isPending ? "Sign Up..." : "Sign Up"}</Button>
        </form>
        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link className="text-indigo-800 hover:underline" to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
