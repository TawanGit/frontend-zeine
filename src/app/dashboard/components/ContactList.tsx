"use client";
import { Edit2, LockIcon, Plus, Search, Trash2, Lock } from "lucide-react";
import React from "react";
import { deleteContact } from "../../../utils/api";

interface ContactProps {
  contacts: Contact[];
  openModal?: (contact: Contact) => void;
  userId: string;
  token: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

function ContactList({ contacts, userId, token }: ContactProps) {
  const groupedContacts = contacts.reduce<Record<string, Contact[]>>(
    (acc, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(contact);
      return acc;
    },
    {}
  );

  const sortedLetters = Object.keys(groupedContacts).sort();

  return (
    <div className="flex-1 px-8 py-6">
      <div className="flex justify-end items-center mb-6 gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-lg text-sm hover:bg-[#333]">
          <Plus className="w-4 h-4" />
          Adicionar contato
        </button>
        <button className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]">
          <LockIcon className="w-4 h-4" />
        </button>
      </div>

      {sortedLetters.map((letter) => (
        <div key={letter} className="border-t border-gray-700 pt-4">
          <h2 className="text-lg font-medium mb-4">{letter}</h2>

          <div className="flex flex-col gap-2">
            {groupedContacts[letter].map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between border-t border-gray-700 py-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={contact.photo}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-medium">{contact.name}</p>
                </div>

                <div className="flex items-center gap-4 w-1/3 justify-between">
                  <span className="flex-1">{contact.phone}</span>
                  <span className="flex-1">{contact.email}</span>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]">
                      <Lock className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
                      onClick={async () => {
                        await deleteContact(
                          contact.id.toString(),
                          userId,
                          token
                        );
                        window.location.reload();
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
