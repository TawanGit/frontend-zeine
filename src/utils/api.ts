const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const AuthUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    let firstError = "Erro ao criar conta";

    if (data?.message) {
      if (Array.isArray(data.message)) {
        firstError = data.message[0];
      } else if (typeof data.message === "string") {
        firstError = data.message.split(",")[0];
      }
    }

    throw new Error(firstError);
  }
  return data;
};

export const SignUpUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    let firstError = "Erro ao criar conta";

    if (data?.message) {
      if (Array.isArray(data.message)) {
        firstError = data.message[0];
      } else if (typeof data.message === "string") {
        firstError = data.message.split(",")[0];
      }
    }

    throw new Error(firstError);
  }

  return data;
};

export const fetchContacts = async (
  userId: string,
  token: string,
  letter?: string
) => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  if (letter) {
    params.append("letter", letter);
  }

  const response = await fetch(`${BASE_URL}/contacts?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    let firstError = "Erro ao buscar contatos";

    if (data?.message) {
      if (Array.isArray(data.message)) {
        firstError = data.message[0];
      } else if (typeof data.message === "string") {
        firstError = data.message.split(",")[0];
      }
    }

    throw new Error(firstError);
  }

  return data;
};

export const deleteContact = async (
  id: string,
  userId: string,
  token: string
) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();
  return data;
};
