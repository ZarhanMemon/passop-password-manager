
import { instances } from "../lib/axious.js";

// GET all passwords
export async function getPasswords() {
  const { data } = await instances.get("/user");
  return data;
}

// POST add a new password
export async function addPassword(passwordData) {
  const { data } = await instances.post("/user/add-password", passwordData);
  return data;
}

// DELETE a password by ID
export async function deletePassword(id) {
  const { data } = await instances.delete(`/user/delete-password/${id}`);
  return data;
}

// GET a password by username ID
export async function getPasswordByUsername(id) {
  const { data } = await instances.get(`/user/search-password/${id}`);
  return data;
}

// PUT update a password by ID
export async function updatePassword(id, updatedData) {
  const { data } = await instances.put(`/user/update-password/${id}`, updatedData);
  return data;
}
