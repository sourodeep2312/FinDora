import { useState } from "react";
import { supabase } from "../services/supabase";
import Button from "./Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password", // change for prod
    });
    if (error) setMessage(error.message);
    else setMessage("Password reset link sent! Check your email.");
  };

  return (
    /*     <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send reset link</button>
      <p>{message}</p>
    </form> */
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg flex flex-col shadow-md justify-center items-center">
      <h2 className="text-3xl font-extrabold mb-4 mt-5 text-zinc-800 text-start">
        Update Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="my-2 flex flex-row space-x-2 justify-center items-center"
      >
        <label className=" text-xl font-medium h-12 flex items-center">
          Email:
        </label>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-zinc-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 my-auto focus:ring-emerald-500"
        />

        <Button className="text-lg">Sent Reset Link</Button>
      </form>
      <p className="text-xl font-bold text-red-500 text-center ">{message}</p>
    </div>
  );
}
