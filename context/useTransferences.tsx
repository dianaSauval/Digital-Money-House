
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface ITransference {
  account_id: number,
  amount: number,
  dated: string,
  description: string,
  destination: string,
  id: number,
  origin: string,
  type: string
}
interface TransferencesContextType {
  transferencesInfo: ITransference[];
  setTransferencesInfo: (transferenceInfo: ITransference[]) => void;
  setIsLoadingTransferences: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingTransferences: boolean;
}

const TransferencesContext = createContext<TransferencesContextType | null>(null);

export const useTransferencesContext = () => {
  const context = useContext(TransferencesContext);
  if (!context) {
    throw new Error("useTransferencesContext debe ser utilizado dentro de un UserProvider");
  }
  return context;
};

interface TransferencesProviderProps {
  children: React.ReactNode;
}

export const TransferencesProvider: React.FC<TransferencesProviderProps> = ({ children }) => {
  const [transferencesInfo, setTransferencesInfo] = useState<ITransference[]>(
    [{
      account_id: 0,
      amount: 0,
      dated: "",
      description: "",
      destination: "",
      id: 0,
      origin: "",
      type: ""
    }]);

  const [isLoadingTransferences, setIsLoadingTransferences] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const account = localStorage.getItem("accountId");

    const fetchData = async () => {
      try {
        const configTransferences = {
          method: "get",
          url: `https://digitalmoney.ctd.academy/api/accounts/${account}/activity`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.request(configTransferences);
        setTransferencesInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoadingTransferences) {
      fetchData();
      setIsLoadingTransferences(false);
    }
  }, [isLoadingTransferences]);


  const value: TransferencesContextType = {
    transferencesInfo,
    setTransferencesInfo,
    setIsLoadingTransferences,
    isLoadingTransferences,
  };

  return (
    <TransferencesContext.Provider value={value} >
      {children}
    </TransferencesContext.Provider>
  );
};
