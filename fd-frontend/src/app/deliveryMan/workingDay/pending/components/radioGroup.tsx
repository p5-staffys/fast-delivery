import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

interface Props {
  ask: object;
  handleClick: ((event: React.SyntheticEvent<Element, Event>, checked: boolean) => void) | undefined;
}

export default function ErrorRadios({ ask, handleClick }: Props): React.ReactElement {
  return (
    <FormControl sx={{ alignItems: "center" }}>
      <Typography mt={4} fontWeight={700} fontSize="15px" lineHeight={"20px"}>
        {Object.values(ask)}
      </Typography>
      <RadioGroup row sx={{ mt: 2 }}>
        <FormControlLabel
          value="true"
          control={<Radio />}
          name={Object.keys(ask)[0]}
          label="Si"
          labelPlacement="bottom"
          onChange={handleClick}
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          name={Object.keys(ask)[0]}
          label="No"
          labelPlacement="bottom"
          onChange={handleClick}
        />
      </RadioGroup>
    </FormControl>
  );
}
