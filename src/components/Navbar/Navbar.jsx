import { Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Navbar = () => {
    return (
        <Stack
            width={"100%"}
            sx={{
                backgroundColor: "white",
                zIndex: 100,
                position: "sticky",
                top: 0,
                boxShadow: "2px 12px 24px -25px rgba(0,0,0,0.75)",
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={"center"}
                width={"1366px"}
                margin={"auto"}
                height={"80px"}
            >
                <Stack component={"a"} href={"#"}>
                    <img src={logo} width={100} alt="" />
                </Stack>
                <Stack direction={"row"} gap={3}>
                    <a className="navLinks" href="#bizHaqimizda">
                        Biz Haqimizda
                    </a>
                    <a className="navLinks" href="#tanlov">
                        Tog&apos;ri Tanlov
                    </a>
                    <a className="navLinks" href="#maxsulotlar">
                        Maxsulotlar
                    </a>
                    <a className="navLinks" href="#contacts">
                        Ish Bo&apos;yicha
                    </a>
                </Stack>
                <Stack>
                    <Typography
                        sx={{
                            color: "#013690",
                            fontSize: "1.1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                        fontWeight={600}
                        variant="h6"
                    >
                        <LocalPhoneIcon /> +998 90 123 45 67
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Navbar;
