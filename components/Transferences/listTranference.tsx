import React, { useEffect } from "react";
import ItemTranference from "./itemTransference";
import { Divider } from "@mui/material";
import { useTransferencesContext } from "../../context/useTransferences";
import useTransferences from "../../hooks/useTransference";

const ListTranference = () => {
  const { isLoadingTransferences } = useTransferencesContext();

  const { transferencesInfo, isLoadingTransferenceHook } = useTransferences();

  useEffect(() => {
    !isLoadingTransferences && console.log(transferencesInfo);
  }, [transferencesInfo]);

  return (
    <>
      {
        !isLoadingTransferenceHook && transferencesInfo?.map((transference: any, idx: any) => {
          return (
            <React.Fragment key={idx}>
              <ItemTranference key={transference.id} transference={transference} />
              {
                idx !== transferencesInfo?.length - 1 && (
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

export default ListTranference;