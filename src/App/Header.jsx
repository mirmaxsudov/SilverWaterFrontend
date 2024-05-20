import HeaderContactForm from "../components/UI/HeaderContactForm/HeaderContactForm";
import Snackbar from "@mui/joy/Snackbar";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="hero-header" id="#">
            <HeaderContactForm setOpen={setOpen} open={open} />
            <Snackbar
                autoHideDuration={3000}
                color="primary"
                open={open}
                onClose={() => setOpen(false)}
                size="lg"
                variant="solid"
            >
                So&apos;rovingiz yuborildi
            </Snackbar>
        </div>
    );
};

export default Header;
