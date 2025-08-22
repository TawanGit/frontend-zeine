"use client";

import { useState } from "react";
import { Edit2, Trash2, Lock, Check, X } from "lucide-react";
import { Contact, ContactUpdate } from "../../../../types/type";
import { deleteContact, updateContact } from "../../../../utils/contacts";
import ErrorMessage from "../../../components/Error";

interface ContactItemProps {
  contact: Contact;
  userId: string;
  token: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ContactItem({
  contact,
  userId,
  token,
  onDelete,
  onUpdate,
}: ContactItemProps) {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState<ContactUpdate>({
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      await updateContact(userId, token, contact.id.toString(), editedData);
      setEditing(false);
      onUpdate();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar contato");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });
    setError(null);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteContact(contact.id.toString(), userId, token);
      onDelete();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar contato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center border-t border-gray-700 py-4 gap-4 w-full">
      <div className="flex items-center gap-3 flex-1 min-w-[120px]">
        <img
          src={contact.photo}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col w-full">
          <label className="text-gray-400 text-xs mb-1">Nome</label>
          {editing ? (
            <input
              type="text"
              value={editedData.name || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white w-full"
            />
          ) : (
            <p className="text-white font-semibold">{contact.name}</p>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="text-gray-400 text-xs mb-1">Telefone</label>
        {editing ? (
          <input
            type="text"
            value={editedData.phone || ""}
            onChange={(e) =>
              setEditedData({ ...editedData, phone: e.target.value })
            }
            className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white w-full"
          />
        ) : (
          <p className="text-gray-300">{contact.phone}</p>
        )}
      </div>

      <div className="flex-1 min-w-[150px] overflow-hidden">
        <label className="text-gray-400 text-xs mb-1">E-mail</label>
        {editing ? (
          <input
            type="text"
            value={editedData.email || ""}
            onChange={(e) =>
              setEditedData({ ...editedData, email: e.target.value })
            }
            className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white w-full"
          />
        ) : (
          <p className="text-gray-300 truncate">{contact.email}</p>
        )}
      </div>

      {error && editing && (
        <div className="mt-1 md:mt-0 md:ml-4">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 md:mt-0">
        {editing ? (
          <>
            <button
              disabled={loading}
              className="flex items-center justify-center bg-green-600 p-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              onClick={handleUpdate}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              disabled={loading}
              className="flex items-center justify-center bg-red-600 p-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
              onClick={() => setEditing(true)}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]">
              <Lock className="w-4 h-4" />
            </button>
            <button
              className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {!editing && error && (
        <div className="w-full mt-2 md:mt-1">
          <ErrorMessage message={error} />
        </div>
      )}
    </div>
  );
}
