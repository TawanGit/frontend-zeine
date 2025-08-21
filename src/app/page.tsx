"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen w-screen bg-[#2c2c2c]">
      <div className="hidden flex-1 relative md:flex items-start p-6 bg-black">
        <img
          src="https://images.unsplash.com/photo-1549921296-3a878995a882?q=80&w=1200&auto=format&fit=crop"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-md"
        />
        <div className="relative z-10 flex items-start">
          <img src="logo-guard.png" alt="logo" className=" " />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-12 bg-[#1a1a1a]">
        <div className="absolute top-12 right-12 text-gray-400 text-sm">
          <span className="text-gray-400">Não tem uma conta?</span>
          <a href="#" className="text-[#C4F120] ml-1">
            Criar conta
          </a>
        </div>
        <h2 className="text-white text-2xl font-semibold mb-6">
          Acessar conta
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-lime-400"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-lime-400"
            />
          </div>
          <div className="justify-end flex items-center mt-2">
            <button className="bg-[#C4F120] text-black font-bold w-max px-8  rounded-2xl align-end py-3 mt-2 hover:bg-lime-500 transition">
              Acessar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
