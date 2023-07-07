import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  firstname: string;
  lastname: string;
  phone: string;
  dni: number;
  email: string;
  password: string;
}

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe ser utilizado dentro de un UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProviderNew: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: "",
    lastname: "",
    phone: "",
    dni: 0,
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const configInfo = {
          method: "get",
          url: `https://digitalmoney.ctd.academy/api/users/${userId}`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.request(configInfo);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }

    };

    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
  }, [isLoading]);

  const value: UserContextType = {
    userInfo,
    setUserInfo,
    setIsLoading,
    isLoading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
