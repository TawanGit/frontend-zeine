import React from "react";

function Alphabet() {
  return (
    <div className="bg-lime-400 w-16 rounded-3xl flex flex-col items-center justify-center gap-2 py-6">
      {"ABCDEFGHIJKLMNO".split("").map((letter) => (
        <span
          key={letter}
          className={`text-black font-bold ${
            letter === "C" ? "scale-125" : ""
          }`}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

export default Alphabet;
