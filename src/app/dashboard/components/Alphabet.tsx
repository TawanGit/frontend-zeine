"use client";
import React, { useState, useRef, useEffect } from "react";
import { fetchContacts } from "../../../utils/contacts";

interface AlphabetProps {
  contacts: (data: any[]) => void;
  token: string;
}

function Alphabet({ contacts, token }: AlphabetProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  const handleClick = async (letter: string) => {
    setActiveLetter(letter);
    const userId = localStorage.getItem("userId");
    if (userId) {
      const data = await fetchContacts(userId, token, letter);
      contacts(data);
    } else {
      console.error("Id não encontrado no localStorage");
    }
  };

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLetter]);

  return (
    <div className="bg-lime-400 max-w-4/5  overflow-auto md:w-20 px-2 rounded-3xl mt-6 flex flex-row md:flex-col  items-center justify-start gap-2 py-6 max-h-[400px]">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <span
          key={letter}
          ref={activeLetter === letter ? activeRef : null}
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
