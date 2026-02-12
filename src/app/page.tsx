import { Container, Typography, Button, Box, Paper } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          MUI + Next.js
        </Typography>
        <Typography color="text.secondary" paragraph>
          Material UI is running with its default theme — palette, typography,
          spacing, and components use the predefined values.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Theme palette
          </Typography>
          <Typography variant="body2" color="text.secondary">
            primary, secondary, error, warning, info, success — all from the
            default MUI theme.
          </Typography>
        </Paper>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Link href="/">
            <Button variant="contained">Contained</Button>
          </Link>
          <Link href="/">
            <Button variant="outlined">Outlined</Button>
          </Link>
          <Link href="/">
            <Button variant="text">Text</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
