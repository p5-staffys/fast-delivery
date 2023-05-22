export default function getColorText(status: string): string {
  if (status === "Entregado" || status === "delivered") {
    return "#9FCB7C";
  } else if (status === "Cancelado" || status === "canceled") {
    return "#FF5757";
  } else if (status === "En viaje" || status === "delivering") {
    return "#F3C54F";
  }
  return "primary";
}
