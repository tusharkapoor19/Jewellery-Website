import { USER_API_BASE } from "../config";
import { apiRequest } from "./client";

// Matches user-services/src/models/users.js (password/otp fields excluded
// server-side via .select("-password -otp -logotp -otpExpiry")).
export interface ApiUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: "customer" | "admin";
}

interface GetUsersResponse {
  success: boolean;
  users: ApiUser[];
}

interface UpdateUserResponse {
  success: boolean;
  message: string;
  user: ApiUser;
}

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

// GET /admin/users - protected by authMiddleware + adminMiddleware
export const fetchUsers = async (): Promise<ApiUser[]> => {
  const data = await apiRequest<GetUsersResponse>(`${USER_API_BASE}/users`);
  return data.users;
};

// PATCH /admin/user/:id - protected by authMiddleware + adminMiddleware
export const updateUserRole = async (
  id: string,
  role: "customer" | "admin"
): Promise<ApiUser> => {
  const data = await apiRequest<UpdateUserResponse>(
    `${USER_API_BASE}/user/${id}`,
    { method: "PATCH", body: { role } }
  );
  return data.user;
};

// DELETE /admin/user/:id - protected by authMiddleware + adminMiddleware
export const deleteUser = async (id: string): Promise<void> => {
  await apiRequest<DeleteUserResponse>(`${USER_API_BASE}/user/${id}`, {
    method: "DELETE",
  });
};
