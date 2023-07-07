import axios from "axios";
import { useEffect, useState } from "react";
import { IService } from "../types";
type Props = {
  search: string;

}
export const useServices = ({ search }: Props) => {
  const [services, setServices] = useState<IService[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const configService = {
      method: "get",
      url: "https://digitalmoney.ctd.academy/service",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(configService)
      .then((response) => {
        console.log("en el servicio: "+search);
        setServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return [services];
};
