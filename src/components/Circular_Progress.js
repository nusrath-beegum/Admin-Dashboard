import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <Stack
      sx={{ color: "grey.500", ml: 60, mt: 30 }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </Stack>
  );
}
