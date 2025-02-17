import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

export default function DrawerMobileNavigation() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: { sm: "block", md: "none" } }}>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
            ml: 2,
            mt: 2,
            mr: 2,
            mb: 1,
          }}
        >
          <Typography level="h4" fontWeight="lg">
            Silver Water
          </Typography>
          <ModalClose id="close-icon" sx={{ position: "initial" }} />
        </Box>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: "none",
            fontSize: "xl",
            paddingX: "24px",
            "& > div": { justifyContent: "start" },
          }}
        >
          <ListItemButton
            component="a"
            href="#"
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: "lg",
              borderRadius: "0.6rem",
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "#013894 !important",
                color: "white !important",
                borderRadius: "0.6rem",
              },
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon /> Home
          </ListItemButton>
          <ListItemButton
            component="a"
            href="#bizHaqimizda"
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: "lg",
              borderRadius: "0.6rem",
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "#013894 !important",
                color: "white !important",
                borderRadius: "0.6rem",
              },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Groups2OutlinedIcon /> Biz Haqimizda
          </ListItemButton>
          <ListItemButton
            component="a"
            href="#tanlov"
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: "lg",
              borderRadius: "0.6rem",
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "#013894 !important",
                color: "white !important",
                borderRadius: "0.6rem",
              },
              display: "flex",
              alignItems: "center",
            }}
          >
            <PsychologyOutlinedIcon /> To&apos;g&apos;ri Tanlov
          </ListItemButton>
          <ListItemButton
            component="a"
            href="#mahsulotlar"
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: "lg",
              borderRadius: "0.6rem",
              transition: "all 0.2s ease",
              ":hover": {
                backgroundColor: "#013894 !important",
                color: "white !important",
                borderRadius: "0.6rem",
              },
              display: "flex",
              alignItems: "center",
            }}
          >
            <CategoryOutlinedIcon /> Mahsulotlar
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}
