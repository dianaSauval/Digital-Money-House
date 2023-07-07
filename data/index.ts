/* import { ITransference } from "../types";
 */
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


export const transferences : ITransference[] = [
  {
    id: 1,
    dated: "2021-01-01, 01:00",
    amount: 100,
    description: "Transferência 1",
    type: "DEBIT",
    account_id: 1,
    origin: "Benjamin",
    destination: "Conta 2"
  },
  {
    id: 2,
    dated:"2021-01-02 02:00",
    amount: 200,
    description: "Transferência 2",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id: 3,
    dated: "2021-01-03",
    amount: 300,
    description: "Transferência 3",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id: 4,
    dated: "2021-01-04",
    amount: 400,
    description: "Transferência 4",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"

  },
  {
    id: 5,
    dated: "2021-01-05",
    amount: 500,
    description: "Transferência 5",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id: 6,
    dated: "2021-01-06",
    amount: 600,
    description: "Transferência 6",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id: 7,
    dated: "2021-01-07",
    amount: 700,
    description: "Transferência 7",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id: 8,
    dated: "2021-01-08",
    amount: 800,
    description: "Transferência 8",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id: 9,
    dated: "2021-01-09",
    amount: 900,
    description: "Transferência 9",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id:10,
    dated: "2021-01-10",
    amount: 1000,
    description: "Transferência 10",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id:11,
    dated: "2021-01-11",
    amount: 1100,
    description: "Transferência 11",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id:12,
    dated: "2021-01-12",
    amount: 1200,
    description: "Transferência 12",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id:13,
    dated: "2021-01-13",
    amount: 1300,
    description: "Transferência 13",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id:14,
    dated: "2021-01-14",
    amount: 1400,
    description: "Transferência 14",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id:15,
    dated: "2021-01-15",
    amount: 1500,
    description: "Transferência 15",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id:16,
    dated: "2021-01-16",
    amount: 1600,
    description: "Transferência 16",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id:17,
    dated: "2021-01-17",
    amount: 1700,
    description: "Transferência 17",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  },
  {
    id:18,
    dated: "2021-01-18",
    amount: 1800,
    description: "Transferência 18",
    type: "CREDIT",
    account_id: 2,
    origin: "Conta 2",
    destination: "Conta 1"
  },
  {
    id:19,
    dated: "2021-01-19",
    amount: 1900,
    description: "Transferência 19",
    type: "DEBIT",
    account_id: 1,
    origin: "Conta 1",
    destination: "Conta 2"
  }
];

type Props = {
    transferences: ITransference[]
}

/* export const dataTransferences = ({transferences}:Props) => {
  return [];
}; */
