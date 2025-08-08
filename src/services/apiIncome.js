import { supabase } from "./supabase";

export async function getIncome() {
  const { data, error } = await supabase.from("transaction").select("*");

  if (error) {
    console.log(error);
    throw new Error("Income data could not ne loaded");
  }
  return data;
}

export async function createTransaction(formData) {
  const type = formData.get("type");
  const newTransactions = {
    type,
    amount: formData.get("amount"),
    date: formData.get("date"),
    note: formData.get("note").slice(0, 50),
  };
  if (type === "income") {
    newTransactions.source = formData.get("source");
  } else if (type === "expense") {
    newTransactions.purpose = formData.get("purpose");
  }
  const { error } = await supabase
    .from("transaction")
    .insert([newTransactions])
    .select();
  if (error) {
    console.error("Transaction information could not be uploaded");
  } else {
    console.log("Transaction information successfully  uploaded");
  }
}
