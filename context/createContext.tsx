import { createContext, useContext, useState } from "react";
import { IAccount, IUser } from "../types";

type context = {
  userDataInitial: IUser,
  setUserDataInitial: React.Dispatch<React.SetStateAction<IUser>>,
  account: IAccount,
  setUserAccount: React.Dispatch<React.SetStateAction<IAccount>>
}

export const INITIAL_VALUE_ACCOUNT = {
  alias: "",
  available_amount: "",
  cvu: "",
  id: 0,
  user_id: 0
};

export const INITIAL_VALUE_USER = {
  firstname: "",
  lastname: "",
  phone: "",
  dni: 0,
  email: "",
  password: "",
};

export const UserContext = createContext<context>({
  userDataInitial: INITIAL_VALUE_USER,
  account: INITIAL_VALUE_ACCOUNT,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserAccount: () => { },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserDataInitial: () => { }
});

type Props = {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {

  const [userDataInitial, setUserDataInitial] = useState<IUser>(
    INITIAL_VALUE_USER
  );
  const [account, setUserAccount] = useState<IAccount>(
    INITIAL_VALUE_ACCOUNT
  );
  const data = { userDataInitial, account, setUserAccount, setUserDataInitial };
  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);