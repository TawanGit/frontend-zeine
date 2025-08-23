"use client";

import { Plus, LockIcon, Search } from "lucide-react";
import React, { useState, useRef } from "react";
import ContactGroup from "./ContactGroup";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactProps {
  contacts: Contact[];
  openModal: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  userId: string;
  token: string;
}

export default function ContactList({
  contacts,
  userId,
  token,
  openModal,
  onDelete,
  onUpdate,
}: ContactProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<NodeJS.Timeout | null>(null);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Contact[]>>((acc, c) => {
    const firstLetter = c.name[0].toUpperCase();
    acc[firstLetter] = [...(acc[firstLetter] || []), c];
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <div className="flex-1 px-4 lg:px-8 py-6 w-full lg:h-auto overflow-y-auto">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4 flex-wrap">
        <div className="relative w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-transparent border border-[#303030] rounded-lg pl-8 pr-3 py-2 text-sm text-white w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0 flex-wrap">
          <button
            onClick={openModal}
            onMouseEnter={() => {
              tooltipTimer.current = setTimeout(
                () => setShowTooltip(true),
                7000
              );
            }}
            onMouseLeave={() => {
              if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
              setShowTooltip(false);
            }}
            className="relative flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-lg text-sm hover:bg-[#333]"
          >
            <Plus className="w-4 h-4" />
            Adicionar contato
            {showTooltip && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">
                Tá esperando o quê? Boraa moeer!! 🚀
              </span>
            )}
          </button>
          <button
            className="flex items-center justify-center bg-[#2c2c2c] p-2 rounded-lg hover:bg-[#333]"
            onClick={() => setIsLocked(!isLocked)}
          >
            <LockIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {letters.map((letter) => (
        <ContactGroup
          key={letter}
          letter={letter}
          contacts={grouped[letter]}
          userId={userId}
          token={token}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isLocked={isLocked}
        />
      ))}

      {letters.length === 0 && (
        <div className="flex pt-12 justify-center h-full">
          <p className="text-gray-500">Nenhum contato encontrado</p>
        </div>
      )}
    </div>
  );
}
