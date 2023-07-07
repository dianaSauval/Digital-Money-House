import axios from "axios";
import { useEffect, useState } from "react";
import { ITransference } from "../types";

const useTransferences = () => {
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

  const [isLoadingTransferenceHook, setIsLoadingTransferenceHook] = useState(true);

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
    if (isLoadingTransferenceHook) {
      fetchData();
      setIsLoadingTransferenceHook(false);
    }

  }, []); // Sin dependencias para que solo se ejecute una vez al montar el componente

  return { transferencesInfo, isLoadingTransferenceHook };
};

export default useTransferences;