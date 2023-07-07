import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface DepositInfo {
  id: number,
  account_id: number,
  Info: string,
  description: string,
  origin: string,
  destination: string,
  amount: number,
  dated: string
}

interface DepositContextType {
  depositInfo: DepositInfo;
  setDepositInfo: React.Dispatch<React.SetStateAction<DepositInfo>>;
}

const DepositContext = createContext<DepositContextType | null>(null);

export const useDepositContext = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error("useDepositContext debe ser utilizado dentro de un UserProvider");
  }
  return context;
};

interface DepositProviderProps {
  children: React.ReactNode;
}

export const DepositProvider: React.FC<DepositProviderProps> = ({ children }) => {
  const [depositInfo, setDepositInfo] = useState<DepositInfo>({
    id: 0,
    account_id: 0,
    Info: "",
    description: "",
    origin: "",
    destination: "",
    amount: 0,
    dated: ""
  });

  const value: DepositContextType = {
    depositInfo,
    setDepositInfo,
  };

  return (
    <DepositContext.Provider value={value}>
      {children}
    </DepositContext.Provider>
  );
};
