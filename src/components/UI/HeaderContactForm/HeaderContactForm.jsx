import { Stack, TextField, Typography } from "@mui/material";
import MuiTelInput from "../MuiTelInput/MuiTelInput";

const HeaderContactForm = () => {
    return (
        <Stack
            gap={2}
            p={{
                xs: 2,
                sm: 3,
                md: 4,
            }}
            width={{
                xs: 350,
                md: 500,
            }}
            sx={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
        >
            <Typography variant="h5" fontWeight={600} sx={{ color: "white" }}>
                Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="body1" color={"white"}>
                So&apos;rov qoldiring va menejerimiz siz bilan bog&apos;lanadi
            </Typography>
            <TextField
                placeholder="Ismingiz"
                type="text"
                InputProps={{ style: { backgroundColor: "white" } }}
            />
            <MuiTelInput />
        </Stack>
    );
};

export default HeaderContactForm;
