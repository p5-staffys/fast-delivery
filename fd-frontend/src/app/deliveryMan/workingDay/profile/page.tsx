"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import { User } from "@/utils/interfaces/user.interfaces";
import { alert, toast } from "@/utils/alerts/alerts";
import { getCurrentUser, updateUser } from "../../../services/user.service";
import { Button, TextField } from "@mui/material";
import { uploadAvatarTemp } from "@/app/services/storage.service";

const EditProfile = (): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>(
    "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
  );
  const [avatar, setAvatar] = useState<Blob | false>(false);

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setName(currentUser.name);
        setLastName(currentUser.lastName);
        setAvatarURL(currentUser.avatarURL);
      } catch {
        alert.fire({ icon: "error", title: "Error", text: "Hubo un problema. Por favor, vuelva a intentarlo." });
      }
    };
    getUser();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      setAvatar(file);
      const newAvatarURL = await uploadAvatarTemp(file);
      setAvatarURL(newAvatarURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (user) {
      const updatedInfo: Partial<User> = {};
      if (name != user.name) updatedInfo.name = name;
      if (lastName != user.lastName) updatedInfo.lastName = lastName;
      try {
        const response = await updateUser(user._id, updatedInfo, avatar);
        if (response) {
          toast.fire({ icon: "success", text: "Usuario actualizado con éxito." });
          router.push("/deliveryMan/workingDay");
        }
      } catch {
        alert.fire({ icon: "error", title: "Error", text: "Hubo un problema. Por favor, vuelva a intentarlo." });
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          width: "90vw",
          maxWidth: "640px",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 4 }}>
          <img src={avatarURL} alt="avatar" width={"240px"} height={"auto"}></img>
        </Box>
        <Button variant="contained" fullWidth component="label" sx={{ mt: 3, mb: 4 }}>
          Subir foto nueva
          <input type="file" accept=".jpg" hidden onChange={handleUpload} />
        </Button>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          fullWidth
          type="email"
          color="primary"
          value={user?.email}
          disabled
        />
        <TextField
          id="standard-basic"
          label="Nombre"
          variant="standard"
          fullWidth
          type="string"
          color="primary"
          value={name}
          onChange={(e): void => {
            setName(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Apellido"
          variant="standard"
          fullWidth
          type="string"
          color="primary"
          value={lastName}
          onChange={(e): void => {
            setLastName(e.target.value);
          }}
        />
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 4 }}>
          <strong>Actualizar Perfil</strong>
        </Button>
      </Box>
    </>
  );
};

export default EditProfile;
