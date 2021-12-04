import { ContentCopy, Done, Facebook } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Page() {
  return (
    <Button startIcon={<ContentCopy />} variant="contained" color="secondary" size="large" fullWidth>
      Yo
    </Button>
  );
}
