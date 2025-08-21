"use client";
import SidebarComponent from "./components/Sidebar";
import Alphabet from "./components/Alphabet";
import ContactList from "./components/ContactList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchContacts } from "../../utils/api";

export default function ContactsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<any>([]);
  const [userid, setUserId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    setToken(token);
    setIsLoading(false);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID inválido");
      return;
    }
    setUserId(userId);

    const fetchInitialContacts = async () => {
      try {
        const data = await fetchContacts(userId, token, undefined);
        setContacts(data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
        setContacts([]);
      }
    };

    fetchInitialContacts();
  }, [router]);

  return (
    <div className="flex bg-black h-screen w-screen  text-white">
      <SidebarComponent />
      <main className="flex-1 flex items-center justify-center px-10">
        <div className="bg-[#1a1a1a] w-full h-[90%] rounded-3xl flex">
          <div className="flex flex-col   mx-8 items-start  m-8  ">
            <h1 className="text-2xl  font-semibold">Lista de contatos</h1>
            <div className="flex items-center gap-4 mt-4 px-4">
              <Alphabet contacts={(data) => setContacts(data)} token={token} />
            </div>
          </div>

          <ContactList contacts={contacts} userId={userid} token={token} />
        </div>
      </main>
    </div>
  );
}
