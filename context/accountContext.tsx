import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AccountInfo {
  alias: string;
  available_amount: string;
  cvu: string;
  user_id: number;
}

interface AccountContextType {
  accountInfo: AccountInfo;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const AccountContext = createContext<AccountContextType | null>(null);

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext debe ser utilizado dentro de un UserProvider");
  }
  return context;
};

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountProviderNew: React.FC<AccountProviderProps> = ({ children }) => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    alias: "",
    available_amount: "",
    cvu: "",
    user_id: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const configAccount = {
          method: "get",
          url: "https://digitalmoney.ctd.academy/api/account",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.request(configAccount);
        setAccountInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
  }, [isLoading]);

  const value: AccountContextType = {
    accountInfo,
    setIsLoading,
    isLoading,
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};
