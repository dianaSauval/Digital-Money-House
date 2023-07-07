
const catchError = (response: any) => {
  if (response.response.data.error === "invalid card expiration_date format. Must be MM/YYYY, and year must start with 20XX") {
    return "formato de fecha de caducidad no válido. Debe ser MM/AAAA y el año debe comenzar con 20XX";
  }
  if (response.response.data.error === "request does not contain an access token") {
    return "Credenciales de autorización inválidas";
  }

  return "Lo sentimos, no se ha podido realizar la operación.";
};

export default catchError;
