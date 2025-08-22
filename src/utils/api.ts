export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function handleRequest(
  url: string,
  options: RequestInit,
  defaultError: string
) {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    let firstError = defaultError;
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
}
