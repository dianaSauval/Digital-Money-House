interface DataType {
  email: string;
  firstName: string;
  lastName: string;
}

const sendConfirmationEmail = async (data: DataType) =>
  fetch("/api/confirmation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => console.table(response));
export default sendConfirmationEmail;
