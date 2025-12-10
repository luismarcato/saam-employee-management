export function formatDateToBR(date) {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

export function formatDateToISO(date) {
  if (!date) return "";

  const [day, month, year] = date.split("/");

  return `${year}-${month}-${day}`;
}

export function formatCurrencyBR(value) {
  if (value == null) return "";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

