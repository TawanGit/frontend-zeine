"use client";
import { Edit2, LockIcon, Plus, Search, Trash2, Lock } from "lucide-react";
import React from "react";

interface ContactListProps {
  contacts: Contact[];
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

function ContactList({ contacts }: ContactListProps) {
  // Group contacts by first letter
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
      <div className="flex justify-end items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar"
              className="bg-transparent border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-sm text-white focus:outline-none"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-lg text-sm hover:bg-[#333]">
            <Plus className="w-4 h-4" />
            Adicionar contato
          </button>
          <button className="bg-[#2c2c2c] p-2 rounded-lg">
            <LockIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {sortedLetters.map((letter) => (
        <div key={letter} className="border-t border-gray-700 pt-4">
          <h2 className="text-lg font-medium mb-4">{letter}</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="pb-2">NOME</th>
                <th className="pb-2">TELEFONE</th>
                <th className="pb-2">EMAIL</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {groupedContacts[letter].map((contact) => (
                <tr key={contact.id} className="border-t border-gray-700">
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={contact.photo}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                    </div>
                  </td>
                  <td className="py-4">{contact.phone}</td>
                  <td className="py-4">{contact.email}</td>
                  <td className="py-4 flex gap-2">
                    <button className="flex items-center gap-1 bg-[#2c2c2c] px-3 py-1 rounded-lg text-sm hover:bg-[#333]">
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button className="bg-[#2c2c2c] p-2 rounded-lg">
                      <Lock className="w-4 h-4" />
                    </button>
                    <button className="bg-[#2c2c2c] p-2 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
