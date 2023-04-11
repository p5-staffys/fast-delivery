"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BackBtn from "../components/backBtn";
import { Container, Typography } from "@mui/material";
import ErrorRadios from "../components/radioGroup";
import { SyntheticEvent, useState } from "react";
import { inicial, questions } from "../../../../../utils/DeclarationUtil";
import { useRouter } from "next/navigation";
import axios from "axios";

const Paquetes = (): JSX.Element => {
  const [asks, setAsks] = useState(inicial);
  const router = useRouter();

  const handleClick = (event: SyntheticEvent<Element, Event>) => {
    const { name, value } = event.target as HTMLButtonElement;
    const res = value === "true" ? true : false;

    setAsks({ ...asks, [name]: res });
  };

  const handleSubmit = () => {
    const arr = Object.values(asks);
    if (arr.some((element) => element === null)) {
      return alert("completa el formulario");
    } else if (arr.every((element) => !element)) {
      alert("Que tenga buen dia");
      // axios
      //   .post("https://api.example.com/user", asks)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      router.push("/deliveryMan/workingDay");
    } else {
      alert("no puede trabajar");
    }
  };

  return (
    <Container>
      <BackBtn back="deliveryMan/workingDay" />

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography fontWeight={400} fontSize="18px" lineHeight={"21,78px"}>
            Declaración jurada
          </Typography>
        </Box>

        {questions.map((ask, i) => (
          <Box key={i}>
            <ErrorRadios ask={ask} handleClick={handleClick} />
          </Box>
        ))}
      </Box>

      <Button
        onClick={handleSubmit}
        sx={{ marginY: "15px" }}
        variant="contained"
        fullWidth={true}
      >
        continuar
      </Button>
    </Container>
  );
};

export default Paquetes;
