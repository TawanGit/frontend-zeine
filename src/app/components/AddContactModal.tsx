"use client";
import { useState } from "react";
import { User, Upload } from "lucide-react";
import { newContact } from "../../utils/contacts";
import SuccessModal from "./Success";
import ErrorModal from "./Error";
import Button from "./Button";

interface AddContactModalProps {
  onClose: () => void;
  token: string;
  userId: string;
}

export default function AddContactModal({
  onClose,
  token,
  userId,
}: AddContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setPhoto(e.target.files[0]);
  };
  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await newContact(
        token,
        { name, phone, email, userId },
        photo || undefined
      );
      setSuccessMessage("Contato criado com sucesso!");
      setErrorMessage(""); // limpa erro anterior
      setTimeout(onClose, 1000);
    } catch (err: any) {
      // se a API retornar um objeto com 'message', use ele
      const apiMessage =
        err?.message || "Erro ao criar contato, tente novamente.";
      setErrorMessage(apiMessage);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="backdrop-blur fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] rounded-xl shadow-lg max-w-[95%] w-[400px] p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-white text-lg font-semibold mb-6">
            Adicionar contato
          </h2>

          <div className="flex flex-col items-center mb-6">
            <div className="w-22 h-22 rounded-2xl object-cover bg-[#111] flex items-center justify-center text-gray-400 overflow-hidden">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Foto do contato"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} />
              )}
            </div>
            <label className="mt-3 px-4 py-2 bg-[#111] border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 cursor-pointer">
              <div className="flex items-center gap-2">
                <Upload size={20} /> Substituir
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm">Nome</label>
              <input
                type="text"
                placeholder="Nome do contato"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-[#111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Telefone</label>
              <input
                type="text"
                placeholder="Número de telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-[#111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">E-mail</label>
              <input
                type="email"
                placeholder="Email do contato"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-md bg-[#111] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
          </div>
          {successMessage && <SuccessModal message={successMessage} />}
          {errorMessage && <ErrorModal message={errorMessage} />}
          <div className="flex justify-end mt-6 gap-3">
            <Button onClick={onClose} loading={loading} variant="darkCancel">
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={loading} variant="primary">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
