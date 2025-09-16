"use client";
import { createContext, use, useState } from "react";

type ContactContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ContactContext = createContext<ContactContextType>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <ContactContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ContactContext.Provider>
  );
};
export const useContact = () => {
  const context = use(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};
