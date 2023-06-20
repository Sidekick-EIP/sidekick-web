import { Box, Container, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "transparent",
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1,
          }}
        >
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
            display: "flex",
            mb: 2,
          }}
        >
        <p className="text-white">
        prout
        </p>
        <p className="text-white">
        tes
        </p>
        </Box>
      </Container>
    </Paper>
  );
}
