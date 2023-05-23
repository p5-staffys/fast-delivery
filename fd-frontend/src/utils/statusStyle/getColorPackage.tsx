import redBox from "../../asset/cajas/caja-roja.png";
import greenBox from "../../asset/cajas/caja-verde.png";
import yellowBox from "../../asset/cajas/caja-amarilla.png";
import blueBox from "../../asset/cajas/caja-azul.png";
import { StaticImageData } from "next/image";

export default function getColorPackage(status: string): StaticImageData {
  if (status === "Entregado" || status === "delivered") {
    return greenBox;
  } else if (status === "Cancelado" || status === "canceled") {
    return redBox;
  } else if (status === "En viaje" || status === "delivering") {
    return yellowBox;
  }
  return blueBox;
}
