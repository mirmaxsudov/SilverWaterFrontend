import { Stack, Button, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const Contacts = () => {
    return (
        <Stack bgcolor={"#013894"} id="contacts">
            <Stack
                maxWidth={"1366px"}
                width={"100%"}
                margin={"auto"}
                direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                    xl: "row",
                }}
                justifyContent={{
                    xs: "center",
                    sm: "center",
                    md: "space-between",
                    lg: "space-between",
                    xl: "space-between",
                }}
                p={5}
                gap={5}
            >
                <Stack
                    width={{
                        xs: "100%",
                        sm: "100%",
                        md: "30%",
                        lg: "30%",
                        xl: "30%",
                    }}
                >
                    <Typography
                        fontWeight={600}
                        color={"white"}
                        variant="h5"
                        textAlign={"center"}
                    >
                        Silver Water
                    </Typography>
                    <Typography
                        color={"white"}
                        variant="body2"
                        textAlign={"center"}
                        mt={2}
                    >
                        Bizga qo'shiling va suvingiz sifatiga g'amxo'rlik
                        qilishni bizga ishonib topshiring – birgalikda kundalik
                        hayotingizni toza, sog'lom va qulayroq qilamiz.
                    </Typography>
                </Stack>
                <Stack
                    alignItems={{
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                        lg: "flex-start",
                        xl: "flex-start",
                    }}
                >
                    <Button component={"a"} className="footerLinks" href="#">
                        <WaterDropOutlinedIcon /> Silver Water
                    </Button>
                    <Button
                        component={"a"}
                        className="footerLinks"
                        href="#bizHaqimizda"
                    >
                        <Groups2OutlinedIcon /> Biz haqimizda
                    </Button>
                    <Button
                        component={"a"}
                        className="footerLinks"
                        href="#tanlov"
                    >
                        <PsychologyOutlinedIcon /> To&apos;ri tanlov
                    </Button>
                    <Button
                        component={"a"}
                        className="footerLinks"
                        href="#maxsulotlar"
                    >
                        <CategoryOutlinedIcon /> Maxsulotlar
                    </Button>
                    <Button
                        component={"a"}
                        className="footerLinks"
                        href="#contacts"
                    >
                        <LocalPhoneOutlinedIcon /> Ish Bo&apos;yicha
                    </Button>
                </Stack>
                <Stack alignItems={"center"}>
                    <Typography variant="h6" fontWeight={600} color={"white"}>
                        Biz Bilan Bog&apos;laning
                    </Typography>
                    <Button component={"a"} className="footerLinks" href="#">
                        <TelegramIcon /> Telegram
                    </Button>
                    <Button component={"a"} className="footerLinks" href="#">
                        <LocationOnOutlinedIcon /> Address
                    </Button>
                    <Button component={"a"} className="footerLinks" href="#">
                        <EmailOutlinedIcon /> Email
                    </Button>
                    <Typography fontWeight={600} className="footerLinks">
                        +998 00 123 45 67
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Contacts;
