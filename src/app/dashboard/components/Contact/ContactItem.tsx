"use client";

import { useState } from "react";
import { Edit2, Trash2, Lock, Check, X } from "lucide-react";
import { deleteContact, updateContact } from "../../../../utils/api";
import { Contact, ContactUpdate } from "../../../../types/type";

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
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-700 py-4 gap-2 md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <img
            src={contact.photo}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {editing ? (
            <input
              type="text"
              value={editedData.name || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
              className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white"
            />
          ) : (
            <p className="font-medium">{contact.name}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-2/3 justify-between overflow-x-auto">
          {editing ? (
            <input
              type="text"
              value={editedData.phone || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, phone: e.target.value })
              }
              className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white flex-1 min-w-[100px]"
            />
          ) : (
            <span className="flex-1 min-w-[100px]">{contact.phone}</span>
          )}
          {editing ? (
            <input
              type="text"
              value={editedData.email || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, email: e.target.value })
              }
              className="bg-transparent border border-gray-600 rounded px-2 py-1 text-white flex-1 min-w-[150px]"
            />
          ) : (
            <span className="flex-1 min-w-[150px]">{contact.email}</span>
          )}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
        </div>
        {error && (
          <p className="text-red-500 text-[12px] mt-1 ml-12 sm:ml-0">{error}</p>
        )}
      </div>
    </>
  );
}
