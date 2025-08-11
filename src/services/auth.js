import { supabase } from "./supabase";

// signin
export async function getSignIn({ email, password }) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    if (error) {
      throw new Error("Incorrect email or password. Please try again.");
    }
  }
  return data;
}

export async function getSignUp({ email, password, fullName }) {
  console.log(fullName);
  const { data: signinData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (
      error.message.includes("already registered") ||
      error.message.includes("User already exists")
    ) {
      throw new Error("This email is already in use.");
    }
    throw new Error(error.message);
  }
  const user = signinData.user;
  if (!user) {
    throw new Error("User not created. Please try again.");
  }

  const { data, error: userError } = await supabase
    .from("profiles")
    .upsert([
      {
        id: user.id,
        email: user.email,
        full_name: fullName,
      },
    ])
    .select()
    .single();

  if (userError) {
    console.error("Error creating user record:", userError);
    throw new Error(userError.message);
  }

  return data;
  // return data;
}
export async function getSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("error.message");
  } else window.location.href = "/signin";
}
