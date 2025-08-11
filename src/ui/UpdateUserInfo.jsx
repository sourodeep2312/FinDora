import useUpdatePass from "../hooks/useUpdatePass";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateName } from "../hooks/useUpdateName";
import { useUser } from "../hooks/useUser";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

function UpdateUserInfo() {
  const { data: user } = useUser();

  const { mutate: updateEmailPass, isPending: isPassUpdating } = useUpdatePass(
    {}
  );

  const { mutate: updateName, isPending: isNameUpdating } = useUpdateName({});

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.full_name || "",
        email: user.email || "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Separate form submit for updating name
  const handleNameSubmit = (e) => {
    e.preventDefault();

    if (!formValues.name.trim()) {
      toast.error("Full name cannot be empty");
      return;
    }
    updateName({ name: formValues.name.trim() });
  };

  // Separate form submit for email & password
  const handleEmailPassSubmit = (e) => {
    e.preventDefault();

    if (formValues.newPassword !== formValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate email format if email changed
    /*    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues.email && !emailRegex.test(formValues.email)) {
      toast.error("Invalid email format");
      return; }*/

    // Password length check if provided
    if (!formValues.newPassword || !formValues.confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (formValues.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const updateData = {};
    if (formValues.email && formValues.email.trim() !== "") {
      updateData.email = formValues.email.trim();
    }
    if (formValues.newPassword && formValues.newPassword.trim() !== "") {
      updateData.password = formValues.newPassword;
    }

    if (Object.keys(updateData).length === 0) {
      toast.error("Please provide email or password to update");
      return;
    }

    updateEmailPass(updateData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg flex flex-col shadow-md">
      <h2 className="text-2xl font-extrabold mb-4 mt-5 text-zinc-800">
        Update Profile
      </h2>

      <form
        onSubmit={handleNameSubmit}
        className="flex flex-col text-xl font-medium"
      >
        <div className="my-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="sm:w-44 text-xl font-medium flex items-center">
            Update Full Name:
          </label>
          <input
            type="text"
            value={formValues.name}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Full Name"
            required
            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-12 w-full"
          />
        </div>

        <Button
          className="w-full sm:w-40 text-lg"
          type="submit"
          disabled={isNameUpdating}
        >
          Update Name
        </Button>
      </form>

      <h2 className="text-2xl font-extrabold mb-4 mt-10 text-zinc-800">
        Change Password
      </h2>

      <form
        onSubmit={handleEmailPassSubmit}
        className="flex flex-col text-xl font-medium"
      >
        <div className="my-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="sm:w-52 text-xl font-medium">Email:</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            disabled
            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-200 disabled:cursor-not-allowed w-full"
          />
        </div>

        <div className="my-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="sm:w-52 text-xl font-medium">
            Create New Password:
          </label>
          <input
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            value={formValues.newPassword}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
          />
        </div>

        <div className="my-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="sm:w-52 text-xl font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={formValues.confirmPassword}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
            placeholder="Confirm New Password"
          />
        </div>

        <Button
          className="w-full sm:w-40 text-lg"
          type="submit"
          disabled={isPassUpdating}
        >
          {isPassUpdating ? <SpinnerMini /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default UpdateUserInfo;
