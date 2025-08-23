"use client";
import { useState } from "react";
import { SignUpUser } from "../../utils/user";
import ErrorMessage from "../components/Error";
import Button from "../components/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      setError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = await SignUpUser(email, password);
      console.log("User created:", data);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#2c2c2c]">
      <div className="hidden flex-1 relative md:flex items-start p-6 bg-black">
        <img
          src="background-home.png"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-md"
        />
        <div className="relative z-10 flex items-start">
          <img src="logo-guard.png" alt="logo" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-12 bg-[#1a1a1a]">
        <div className="absolute top-12 right-12 text-gray-400 text-sm">
          <span className="text-gray-400">Já tem uma conta?</span>
          <a href="/" className="text-[#C4F120] ml-1">
            Acessar conta
          </a>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-6">Criar conta</h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-lime-400"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-lime-400"
          />
          <input
            type="password"
            placeholder="Repetir senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 text-white focus:outline-none focus:border-lime-400"
          />

          {error && <ErrorMessage message={error} />}

          <div className="justify-end flex items-center mt-2">
            <Button
              disabled={loading}
              loading={loading}
              variant="primary"
              onClick={handleRegister}
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
