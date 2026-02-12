import { Container, Typography, Button, Box, Paper } from "@mui/material";
import Link from "next/link";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ThemeModeToggle />
        </Box>
        <Typography component="h1" variant="h3" gutterBottom color="primary">
          Voice123 theme
        </Typography>
        <Typography color="text.secondary" paragraph>
          MUI palette from Voice123 .md-theme-light: primary = accent (blue),
          secondary = primary (gray), warning = warn (orange). Toggle
          light/dark above.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Primary (md-accent) · Warning (md-warn)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #2196f3, #9e9e9e, #ff5722 — background #fff, contrast rgba(0,0,0,.9).
          </Typography>
        </Paper>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Link href="/">
            <Button variant="contained" color="primary">
              Primary
            </Button>
          </Link>
          <Link href="/">
            <Button variant="contained" color="warning">
              Warning (CTA)
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outlined" color="secondary">
              Secondary
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
