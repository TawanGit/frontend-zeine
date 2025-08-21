"use client";

import React from "react";
import ContactItem from "./ContactItem";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactGroupProps {
  letter: string;
  contacts: Contact[];
  userId: string;
  token: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function ContactGroup({
  letter,
  contacts,
  userId,
  token,
  onDelete,
  onUpdate,
}: ContactGroupProps) {
  return (
    <div className="border-t border-gray-700 pt-4">
      <h2 className="text-lg font-medium mb-4">{letter}</h2>
      <div className="flex flex-col gap-2">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            userId={userId}
            token={token}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}
