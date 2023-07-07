import React from "react";
import ItemService from "./itemService";
import { Divider } from "@mui/material";
import { useServices } from "../../hooks/useServices";
import { IService } from "../../types";

type Props = {
  search: string;
}
const ListService = ({ search }: Props) => {
  function filterBySearch(array: IService[]) {
    return array.filter((serviceSearch: IService) => {
      return serviceSearch.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  const [services] = useServices({ search });
  return (
    <>
      {
        filterBySearch(services).map((service, idx) => {
          return (
            <React.Fragment key={idx}>
              <ItemService key={service.id} service={service} />
              {
                idx !== services.length - 1 && (
                  <Divider variant="middle" />
                )
              }
            </React.Fragment>
          );
        })
      }
    </>
  );

};

export default ListService;