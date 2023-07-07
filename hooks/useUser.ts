import axios from "axios";
import { useEffect, useState } from "react";

const useUser = () => {
  const [userInfo, setUserInfo] = useState<any>({
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

  return { userInfo, setIsLoading, isLoading };
};

export default useUser;
