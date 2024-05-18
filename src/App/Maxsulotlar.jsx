import { Stack, Typography } from "@mui/material";
import Carousel from "../components/UI/CarouselMaxsulotlar.jsx/Carousel";

const Maxsulotlar = () => {
    return (
        <Stack
            id={"maxsulotlar"}
            maxWidth={"1920px"}
            width={"1366px"}
            margin={"auto"}
            gap={8}
            justifyContent={"center"}
            py={5}
            minHeight={"calc(768px - 80px)"}
            alignItems={"center"}
        >
            <Typography variant="h3" fontWeight={600}>
                Maxsulotlar
            </Typography>
            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
                <Carousel />
            </Stack>
        </Stack>
    );
};

export default Maxsulotlar;
