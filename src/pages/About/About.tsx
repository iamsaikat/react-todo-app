import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function About() {
  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 4,
          display: "flex",
          flexDirection: "column",
          color: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "500",
            color: grey[800],
          }}
        >
          About
        </Typography>
        <Typography
          sx={{
            pt: 2,
            fontSize: "18px",
            fontWeight: "400",
            color: grey[500],
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Container>
  );
}
