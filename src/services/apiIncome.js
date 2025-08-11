import { supabase } from "./supabase";

// Helper: Get currently logged-in user's ID
export async function getCurrentUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error("User not authenticated");
  return user.id;
}

// Fetch transactions for logged-in user only
export async function getIncome() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");
  const { data, error } = await supabase
    .from("transaction")
    .select("userId, amount, date, type, note, source, purpose, id")
    .eq("userId", user.id);

  if (error) {
    console.error("Failed to load income data:", error);
    throw new Error("Income data could not be loaded");
  }
  return data;
}

// Insert new transaction with userId
export async function createTransaction(formData) {
  // Check user Login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");
  // Create new transaction object
  const type = formData.get("type");
  const newTransaction = {
    userId: user.id,
    type,
    amount: formData.get("amount"),
    date: formData.get("date"),
    note: formData.get("note")?.slice(0, 50) || "",
  };
  if (type === "income") {
    newTransaction.source = formData.get("source");
  } else if (type === "expense") {
    newTransaction.purpose = formData.get("purpose");
  }

  const { error } = await supabase.from("transaction").insert([newTransaction]);

  if (error) {
    console.error("Failed to upload transaction:", error);
    throw error;
  }
  console.log("Transaction successfully uploaded");
}

// Update transaction if it belongs to the user
export async function updateTransaction(id, updatedData) {
  // Check user Login
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");
  const { data, error } = await supabase
    .from("transaction")
    .update(updatedData)
    .eq("id", id)
    .eq("userId", user.id);

  if (error) {
    console.error("Failed to update transaction:", error);
    throw new Error(error.message);
  }
  return data;
}

// Fetch single transaction by id if owned by user
export async function fetchTransactionById(id) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");
  const { data, error } = await supabase
    .from("transaction")
    .select("*")
    .eq("id", id)
    .eq("userId", user.id)
    .single();

  if (error) {
    console.error("Failed to fetch transaction:", error);
    throw error;
  }
  return data;
}

// Delete transaction if owned by user
export async function deleteTransaction(id) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transaction")
    .delete()
    .eq("id", id)
    .eq("userId", user.id);

  if (error) {
    console.error("Failed to delete transaction:", error);
    throw new Error(error.message);
  }
  return data;
}

// Get logged-in user's profile data
export async function getUser() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error(error.message);
  }
  return data;
}

// Update user email and password
export async function updateUserEmailAndPassword({ email, password }) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("User not authenticated");

  const updateData = {};
  if (email && email.trim() !== "") updateData.email = email.trim();
  if (password && password.trim() !== "") updateData.password = password;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No valid email or password provided for update");
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error("Supabase auth updateUser error:", error);
    throw error;
  }
  const { error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Error refreshing session after email update:", sessionError);
    // Optional: throw or handle session refresh error
  }

  // Also update email in profiles table if email changed
  if (email && email.trim() !== "") {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .update({ email: email.trim() })
      .eq("id", user.id);
    console.log("Profile update data:", profileData);
    if (profileError) {
      console.error("Failed to update user email in profiles:", profileError);
      throw profileError;
    }
  }

  return data;
}

// Update user profile's full name and email
export async function updateUserName({ name }) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("User not authenticated");

  if (!name || name.trim() === "") {
    throw new Error("Name cannot be empty");
  }
  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: name.trim() })
    .eq("id", user.id);

  if (error) {
    console.error("Failed to update full_name in profiles table:", error);
    throw error;
  }
  return data;
}
export async function updateUserNameInProfiles({ userId, name }) {
  if (!userId) throw new Error("User ID is required");
  if (!name || !name.trim()) throw new Error("Name cannot be empty");

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: name.trim() })
    .eq("id", userId);

  if (error) throw error;
  return data;
}
