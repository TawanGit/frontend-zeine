"use client";

import { Edit2, LockIcon, Plus, Search, Trash2, Lock } from "lucide-react";
import React, { useState } from "react";
import { deleteContact } from "../../../utils/api";

interface ContactProps {
  contacts: Contact[];
  openModal: () => void;
  onDelete: () => void;
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

function ContactList({
  contacts,
  userId,
  token,
  openModal,
  onDelete,
}: ContactProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedContacts = filteredContacts.reduce<Record<string, Contact[]>>(
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
    <div className="flex-1 px-4 md:px-8 py-6">
      <div className="flex justify-end items-center mb-6 gap-2 md:gap-4 flex-wrap md:flex-nowrap">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white w-full md:w-auto focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0 flex-wrap">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-lg text-sm hover:bg-[#333]"
          >
            <Plus className="w-4 h-4" />
            Adicionar contato
          </button>
          <button className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]">
            <LockIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {sortedLetters.map((letter) => (
        <div key={letter} className="border-t border-gray-700 pt-4">
          <h2 className="text-lg font-medium mb-4">{letter}</h2>

          <div className="flex flex-col gap-2">
            {groupedContacts[letter].map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-700 py-4 gap-2 md:gap-4"
              >
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <img
                    src={contact.photo}
                    alt={contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-medium">{contact.name}</p>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-1/3 justify-between">
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
                        onDelete();
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

      {sortedLetters.length === 0 && (
        <div className="flex pt-12 justify-center h-full">
          <p className="text-gray-500">Nenhum contato encontrado</p>
        </div>
      )}
    </div>
  );
}

export default ContactList;
