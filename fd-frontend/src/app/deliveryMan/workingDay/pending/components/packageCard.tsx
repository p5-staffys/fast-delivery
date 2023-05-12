import React, { useState } from "react";
import Box from "@mui/system/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { IPackagesByClient } from "@/utils/interfaces/package.interfaces";

const PackageCard = ({
  client,
  packagesIds,
  setPackagesIds,
}: {
  client: IPackagesByClient;
  packagesIds: string[];
  setPackagesIds: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element => {
  const clientPackagesIds = client.packages.map((pack) => pack._id);
  const [quantity, setQuantity] = useState<number>(client.packages.length);
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = (status: boolean): void => {
    setSelected(status);
    const filteredPackagesIds = packagesIds.filter((id) => !clientPackagesIds.includes(id));
    const selectedPackages = status ? clientPackagesIds.slice(0, quantity) : [];
    const newPackagesIds = [...filteredPackagesIds, ...selectedPackages];
    setPackagesIds(newPackagesIds);
  };

  const handleRemove = (): void => {
    if (!quantity) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setSelected(true);
    const filteredPackagesIds = packagesIds.filter((id) => !clientPackagesIds.includes(id));
    const selectedPackages = clientPackagesIds.slice(0, newQuantity);
    const newPackagesIds = [...filteredPackagesIds, ...selectedPackages];
    setPackagesIds(newPackagesIds);
  };

  const handleAdd = (): void => {
    if (quantity === client.packages.length) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setSelected(true);
    const filteredPackagesIds = packagesIds.filter((id) => !clientPackagesIds.includes(id));
    const selectedPackages = clientPackagesIds.slice(0, newQuantity);
    const newPackagesIds = [...filteredPackagesIds, ...selectedPackages];
    setPackagesIds(newPackagesIds);
  };

  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="end"
      sx={{
        m: "auto",
        pl: 6,
        pb: 5,
        pt: 5,
        borderBottom: "2px solid #e0e0e0",
      }}
    >
      <Box>
        <Checkbox
          checked={selected}
          value={selected}
          onChange={(e): void => {
            handleSelect(e.target.checked);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="start" flexDirection="column" sx={{ ml: 4 }}>
        <Typography
          sx={{ fontSize: "0.8em" }}
        >{`${client._id.address.street} ${client._id.address.number}`}</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              borderRadius: "3px",
              border: "1px solid #b2bcca",
              padding: 0,
            }}
            onClick={handleRemove}
          >
            -
          </IconButton>
          <Typography sx={{ m: "0 10px" }}>{quantity}</Typography>
          <IconButton
            sx={{
              width: 30,
              height: 30,
              borderRadius: "3px",
              border: "1px solid #b2bcca",
              padding: 0,
            }}
            onClick={handleAdd}
          >
            +
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PackageCard;
