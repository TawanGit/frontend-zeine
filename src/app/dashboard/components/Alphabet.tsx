"use client";
import React, { useEffect, useState } from "react";
import { fetchContacts } from "../../../utils/api";

interface AlphabetProps {
  contacts: (data: any[]) => void;
  token: string;
}
function Alphabet({ contacts, token }: AlphabetProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const handleClick = async (letter: string) => {
    setActiveLetter(letter);
    const userId = localStorage.getItem("userId");
    if (userId) {
      const data = await fetchContacts(userId, token, undefined);
      contacts(data);
      console.log(data);
    } else {
      console.error("Id não encontrado no localStorage");
    }
  };

  return (
    <div className="bg-lime-400 w-16 rounded-3xl flex flex-col items-center justify-center gap-2 py-6">
      {"ABCDEFGHIJKLMNO".split("").map((letter) => (
        <span
          key={letter}
          onClick={() => handleClick(letter)}
          className={`
            text-black font-bold cursor-pointer
            transform transition-transform duration-200
            hover:scale-125
            ${activeLetter === letter ? "scale-200" : ""}
          `}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

export default Alphabet;
