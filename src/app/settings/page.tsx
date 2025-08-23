"use client";

import { useState, useEffect } from "react";
import { User, Save, Edit, Trash2 } from "lucide-react";
import SidebarComponent from "../dashboard/components/Sidebar";
import { deleteUser, updateUser } from "../../utils/user";
import ErrorMessage from "../components/Error";
import SuccessMessage from "../components/Success";

export default function UserSettingsPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (storedEmail) setEmail(storedEmail);
    if (storedUserId) setUserId(storedUserId);
    if (storedToken) setToken(storedToken);
  }, []);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!userId || !token) {
      setError("Usuário ou token não encontrado");
      return;
    }

    try {
      await updateUser(userId, token, { email });
      localStorage.setItem("email", email);
      setIsEditing(false);
      setSuccess("Email atualizado com sucesso!");
    } catch (err: any) {
      setError("Erro ao atualizar email: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    setError("");
    setSuccess("");

    if (!userId || !token) {
      setError("Usuário ou token não encontrado");
      return;
    }
    await deleteUser(userId, token);
    localStorage.clear();
    setSuccess("Conta excluída com sucesso!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const inputClass = (enabled: boolean) =>
    `w-full p-3 rounded-lg bg-[#1B1B1B] border ${
      enabled
        ? "border-lime-400"
        : "border-[#303030] opacity-50 cursor-not-allowed"
    } text-white focus:outline-none focus:border-lime-400`;

  return (
    <div className="flex flex-col md:flex-row bg-black h-screen w-full text-white overflow-x-hidden">
      <SidebarComponent />
      <div className="bg-[#121212] h-full md:h-screen p-8 w-full shadow-lg flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User size={24} /> Configurações do Usuário
          </h1>

          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}

          <div className="mb-4">
            <label className="text-gray-300 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Edit size={18} /> Editar
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-lime-400 text-black px-4 py-2 rounded-lg hover:bg-lime-500 transition"
              >
                <Save size={18} /> Salvar
              </button>
            )}
          </div>

          <div className="mt-12 border-t border-[#303030] pt-6">
            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <Trash2 size={18} /> Excluir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
