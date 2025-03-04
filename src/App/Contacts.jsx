import { Stack, Button, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Link } from "react-router-dom";

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
            Bizga qo'shiling va suvingiz sifatiga g'amxo'rlik qilishni bizga
            ishonib topshiring – birgalikda kundalik hayotingizni toza, sog'lom
            va qulayroq qilamiz.
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
          <Button component={"a"} className="footerLinks" href="#bizHaqimizda">
            <Groups2OutlinedIcon /> Biz haqimizda
          </Button>
          <Button component={"a"} className="footerLinks" href="#tanlov">
            <PsychologyOutlinedIcon /> To&apos;ri tanlov
          </Button>
          <Button component={"a"} className="footerLinks" href="#maxsulotlar">
            <CategoryOutlinedIcon /> Maxsulotlar
          </Button>
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
          <Typography variant="h6" mb={2} fontWeight={600} color={"white"}>
            Biz Bilan Bog&apos;laning
          </Typography>
          <Button
            component={"a"}
            className="footerLinks"
            target="_blank"
            href="https://t.me/silverwater_uz"
          >
            <TelegramIcon /> Telegram
          </Button>
          <Button
            component={"a"}
            target="_blank"
            className="footerLinks"
            href="https://yandex.uz/maps/-/CDbTBJOQ"
          >
            <LocationOnOutlinedIcon /> Набережная улица, 51
          </Button>
          <Button
            component={"a"}
            className="footerLinks"
            target="_blank"
            href="mailto:Info@silver-water.uz"
          >
            <EmailOutlinedIcon /> Info@silver-water.uz
          </Button>
          <Button
            fontWeight={600}
            component={"a"}
            target="_blank"
            href="tel:+998555150550"
            style={{ textDecoration: "none", color: "white" }}
            className="footerLinks"
          >
            <LocalPhoneIcon /> +998 55 515 05 50
          </Button>
        </Stack>
      </Stack>
      <Stack
        bgcolor={"darkblue"}
        p={{
          xs: 3,
          md: 0,
        }}
        textAlign={"center"}
      >
        <Typography color={"white"}>
          Copyright ©{" "}
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "400",
            }}
            component={"a"}
            href="https://t.me/abdurhamonMirmaxsudov"
          >
            Mirmaxsudov
          </Button>{" "}
          &{" "}
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "400",
            }}
            component={"a"}
            href="https://t.me/abdulkhodiev1"
          >
            Abdulkhodiev
          </Button>{" "}
          2024. All rights reserved.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Contacts;
