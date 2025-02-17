import { Link, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DrawerMobileNavigation from "../UI/Sidebar/Sidebar";

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
        maxWidth={"1366px"}
        width={"100%"}
        margin={"auto"}
        height={"80px"}
        px={{
          xs: 2,
          sm: 5,
          md: 5,
          lg: 5,
          xl: 5,
        }}
      >
        <DrawerMobileNavigation />
        <Stack component={"a"} href={"#"}>
          <img src={logo} width={100} alt="" />
        </Stack>

        <Stack
          direction={"row"}
          gap={3}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <a className="navLinks" href="#bizHaqimizda">
            Biz Haqimizda
          </a>
          <a className="navLinks" href="#tanlov">
            To&apos;g&apos;ri Tanlov
          </a>
          <a className="navLinks" href="#mahsulotlar">
            Mahsulotlar
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
            <Link sx={{ color: "#013690" }} href="tel:+998555150550">
              <LocalPhoneIcon />
            </Link>
            <Link
              sx={{
                color: "#013690",
                textDecoration: "none",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                },
                mb: 1,
              }}
              href="tel:+998555150550"
            >
              +998 55 515 05 50
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
