"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DeliveryMan = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    router.push("/deliveryMan/workingDay");
  });
  return <></>;
};

export default DeliveryMan;
