import { UserUpdate } from "../types/type";
import { BASE_URL, handleRequest } from "./api";

export const AuthUser = (email: string, password: string) =>
  handleRequest(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    "Erro ao autenticar usuário"
  );

export const SignUpUser = (email: string, password: string) =>
  handleRequest(
    `${BASE_URL}/user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
    "Erro ao criar conta"
  );

export const updateUser = (
  userId: string,
  token: string,
  dataUser: UserUpdate
) =>
  handleRequest(
    `${BASE_URL}/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(dataUser),
    },
    "Erro ao atualizar usuário"
  );

export const deleteUser = async (userId: string, token: string) =>
  await fetch(`${BASE_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
