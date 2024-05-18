import { Stack, Typography } from "@mui/material";

import CardAnimation from "../components/UI/CardAnimation/CardAnimation";

const Tanlov = () => {
    return (
        <Stack
            id={"tanlov"}
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
                Silver Water - To&apos;gri Tanlov
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
                <CardAnimation />
            </Stack>
        </Stack>
    );
};

export default Tanlov;
