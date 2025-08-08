import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSignIn } from "../hooks/useSignin";

import { useState } from "react";
import toast from "react-hot-toast";

function SignIn() {
  const [email, setEmail] = useState("sd@test.com");
  const [password, setPassword] = useState("1234567890");
  const [, setLocalError] = useState(null);
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: () => {
      navigate("/");
      toast.success("Sign in successfully");
    },
    onError: (err) => {
      setLocalError(err.message);
      toast.error(err.message);
    },
  });
  async function handleSubmit(e) {
    e.preventDefault();
    signIn({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl text-center font-bold text-zinc-800 mb-8">
          Sign in to FinDora
        </h1>
        <form className="flex flex-col  gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Email :
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalError(null);
              }}
              placeholder="user@example.com"
              className=" border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-700 mb-1">
              Password :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLocalError(null);
              }}
              required
              className=" border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <p className="text-right text-sm">
            <Link
              to="/reset-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <Button disabled={isPending}>
            {" "}
            {isPending ? "Sign In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-zinc-500 mt-6">
          Don’t have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
