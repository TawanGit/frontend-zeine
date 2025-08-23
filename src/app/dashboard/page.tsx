"use client";
import SidebarComponent from "./components/Sidebar";
import Alphabet from "./components/Alphabet";
import ContactList from "./components/Contact/ContactList";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../components/AddContactModal";
import { fetchContacts } from "../../utils/contacts";
import AddContactModal from "../components/AddContactModal";

export default function ContactsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<any>([]);
  const [userid, setUserId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [openModal, setOpenModal] = useState<string>("");
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
    <div className="flex flex-col md:flex-row bg-black h-screen w-screen text-white">
      <SidebarComponent />

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center  md:px-10  md:py-0">
        <div className="bg-[#1a1a1a] w-full h-full md:h-[80%] rounded-none lg:rounded-3xl flex flex-col md:flex-row overflow-hidden">
          <div className="flex flex-col mx-4 md:mx-8 mt-4 md:mt-8 items-start w-full md:w-auto">
            <h1 className="text-2xl font-semibold mb-4 opacity-80">
              Lista de contatos
            </h1>
            <div className="flex w-full justify-start md:w-auto overflow-x-auto ">
              <Alphabet contacts={(data) => setContacts(data)} token={token} />
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto h-full overflow-y-auto mt-4 md:mt-0 px-4 md:px-0">
            <ContactList
              contacts={contacts}
              userId={userid}
              token={token}
              onDelete={() => {
                fetchContacts(userid, token).then((data) => setContacts(data));
              }}
              onUpdate={() => {
                fetchContacts(userid, token).then((data) => setContacts(data));
              }}
              openModal={() => setOpenModal("AddContactModal")}
            />
          </div>
        </div>

        {openModal === "AddContactModal" && (
          <AddContactModal
            onClose={() => {
              setOpenModal("");
              fetchContacts(userid, token).then((data) => setContacts(data));
            }}
            token={token}
            userId={userid}
          />
        )}
      </main>
    </div>
  );
}
