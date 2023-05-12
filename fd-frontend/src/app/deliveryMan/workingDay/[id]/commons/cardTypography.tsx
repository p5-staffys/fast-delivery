import React from "react";
import Typography from "@mui/material/Typography";

const CardTypography = ({ title, content }: { title: string; content: string }): JSX.Element => {
  return (
    <div>
      <Typography sx={{ mt: 1, fontWeight: 700 }} variant="subtitle2" color="text.secondary" display="inline">
        {`${title}: `}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="subtitle2" color="text.secondary" display="inline">
        {content}
      </Typography>
    </div>
  );
};

export default CardTypography;
