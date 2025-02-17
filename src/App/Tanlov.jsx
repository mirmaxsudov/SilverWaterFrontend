import { Stack, Typography } from "@mui/material";

import CardAnimation from "../components/UI/CardAnimation/CardAnimation";

const Tanlov = () => {
  return (
    <Stack
      id={"tanlov"}
      maxWidth={"1366px"}
      width={"100%"}
      margin={"auto"}
      gap={8}
      justifyContent={"center"}
      py={5}
      minHeight={"calc(768px - 80px)"}
      alignItems={"center"}
    >
      <Typography
        variant="h3"
        fontWeight={600}
        sx={{
          textAlign: "center",
          color: "#013894",
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
            lg: "3.5rem",
            xl: "4rem",
          },
        }}
        px={{ xs: 2, sm: 5, md: 5, lg: 5, xl: 5 }}
      >
        Silver Water - To&apos;g&apos;ri Tanlov
      </Typography>
      <Stack direction={"row"} alignItems={"center"}>
        <CardAnimation />
      </Stack>
    </Stack>
  );
};

export default Tanlov;
