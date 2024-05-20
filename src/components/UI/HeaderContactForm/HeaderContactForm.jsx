import { Stack, TextField, Typography, Button } from "@mui/material";
import MuiTelInput from "../MuiTelInput/MuiTelInput";
import { apply } from "../../../api/request";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const HeaderContactForm = ({ setOpen }) => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const trimmedPhoneNumber = phoneNumber.replace(/\D/g, "");
    const [error, setError] = useState("");

    const credentials = {
        fullName,
        phoneNumber: "+" + trimmedPhoneNumber,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apply(credentials);
            setOpen(true);
            setError("");
            setFullName("");
            setPhoneNumber("");
        } catch (error) {
            console.log(error);
            setError(error.response.data.localDateTime);
        }
    };

    return (
        <Stack
            gap={1}
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
            {error && (
                <Alert severity="error">Telefon raqam yoki Ism kiritidi</Alert>
            )}
            <Typography variant="h5" fontWeight={600} sx={{ color: "white" }}>
                Biz bilan bog&apos;lanish
            </Typography>
            <Typography variant="body1" color="white">
                So&apos;rov qoldiring va menejerimiz siz bilan bog&apos;lanadi
            </Typography>
            <TextField
                placeholder="Ismingiz"
                type="text"
                value={fullName}
                onChange={(e) => {
                    setFullName(e.target.value);
                }}
                InputProps={{ style: { backgroundColor: "white" } }}
            />
            <MuiTelInput
                value={phoneNumber}
                onChange={(value) => {
                    setPhoneNumber(value);
                }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    py: 1.5,
                    bgcolor: "#013690",
                    fontWeight: 600,
                }}
            >
                Jo&apos;natish
            </Button>
        </Stack>
    );
};

export default HeaderContactForm;
