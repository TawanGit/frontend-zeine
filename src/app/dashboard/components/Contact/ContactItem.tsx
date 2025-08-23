"use client";

import { useState } from "react";
import { Edit2, Trash2, Lock } from "lucide-react";
import { Contact } from "../../../../types/type";
import { deleteContact } from "../../../../utils/contacts";
import ErrorMessage from "../../../components/Error";
import EditContactModal from "../../../components/EditContactModal";

interface ContactItemProps {
  contact: Contact;
  userId: string;
  token: string;
  isLocked: boolean;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ContactItem({
  contact,
  userId,
  token,
  isLocked,
  onDelete,
  onUpdate,
}: ContactItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [isIndividuallyLocked, setIsIndividuallyLocked] = useState<
    boolean | null
  >(null);

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id.toString(), userId, token);
      onDelete();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar contato");
    }
  };

  const finalLock =
    isIndividuallyLocked !== null ? isIndividuallyLocked : isLocked;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center border-t border-[#303030] py-4 gap-4 w-full">
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <span className="text-white opacity-40 text-sm font-bold mb-1 uppercase">
            Nome
          </span>
          <div className="flex items-center gap-3">
            <img
              src={contact.photo}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-white font-semibold">{contact.name}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <span className="text-white opacity-40 text-sm font-bold mb-1 uppercase">
            Telefone
          </span>
          <p className="text-gray-300">
            {finalLock ? "********" : contact.phone}
          </p>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-[150px] overflow-hidden">
          <span className="text-white opacity-40 text-sm font-bold mb-1 uppercase">
            Email
          </span>
          <p className="text-gray-300 truncate">
            {finalLock ? "********" : contact.email}
          </p>
        </div>

        {error && (
          <div className="w-full mt-2 md:mt-1">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <button
            className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
            onClick={() => setOpenEdit(true)}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
            onClick={() =>
              setIsIndividuallyLocked((prev) => (prev === null ? true : !prev))
            }
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {openEdit && (
        <EditContactModal
          onClose={() => setOpenEdit(false)}
          token={token}
          userId={userId}
          contact={contact}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
