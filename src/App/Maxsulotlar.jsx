import { Stack, Typography } from "@mui/material";
import Carousel from "../components/UI/CarouselMaxsulotlar.jsx/Carousel";

const Maxsulotlar = () => {
  return (
    <Stack
      id={"mahsulotlar"}
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
          color: "#013894",
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
            lg: "3.5rem",
            xl: "4rem",
          },
        }}
      >
        Mahsulotlar
      </Typography>
      <Stack direction={"row"} alignItems={"center"} width={"90%"}>
        <Carousel />
      </Stack>
    </Stack>
  );
};

export default Maxsulotlar;
