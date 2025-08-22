import { ContactUpdate } from "../types/type";
import { BASE_URL, handleRequest } from "./api";

export const fetchContacts = (
  userId: string,
  token: string,
  letter?: string
) => {
  const params = new URLSearchParams({ userId });
  if (letter) params.append("letter", letter);

  return handleRequest(
    `${BASE_URL}/contacts?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
    "Erro ao buscar contatos"
  );
};

export const deleteContact = (id: string, userId: string, token: string) =>
  handleRequest(
    `${BASE_URL}/contacts/${id}?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
    "Erro ao deletar contato"
  );

export const newContact = (
  token: string,
  contact: { name: string; email: string; phone: string; userId: string },
  photo?: File
) => {
  const formData = new FormData();
  formData.append("name", contact.name);
  formData.append("email", contact.email);
  formData.append("phone", contact.phone);
  formData.append("userId", contact.userId);
  if (photo) formData.append("photo", photo);

  return handleRequest(
    `${BASE_URL}/contacts/`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    },
    "Erro ao criar contato"
  );
};

export const updateContact = (
  userId: string,
  token: string,
  contactId: string,
  dataContact: ContactUpdate
) =>
  handleRequest(
    `${BASE_URL}/contacts/${userId}/${contactId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(dataContact),
    },
    "Erro ao atualizar contato"
  );
