import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid, Typography } from "@mui/material";

interface Props {
  ask: object;
  handleClick: ((event: React.SyntheticEvent<Element, Event>, checked: boolean) => void) | undefined;
}

export default function ErrorRadios({ ask, handleClick }: Props): React.ReactElement {
  return (
    <Grid container flexDirection="column" alignItems="center">
      <Grid item>
        <Typography mt={3} variant="h6" textAlign="center">
          {Object.values(ask)}
        </Typography>
      </Grid>
      <Grid item>
        <RadioGroup row>
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
      </Grid>
    </Grid>
  );
}
