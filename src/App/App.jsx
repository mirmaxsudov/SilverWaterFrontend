import Header from "./Header";
import BizHaqimizda from "./BizHaqimizda";
import Tanlov from "./Tanlov";
import Maxsulotlar from "./Maxsulotlar";
import Contacts from "./Contacts";
import Navbar from "../components/Navbar/Navbar";
import { Stack } from "@mui/material";

function App() {
    return (
        <Stack sx={{ position: "relative" }} m={"auto"}>
            <Navbar />
            <Header />
            <BizHaqimizda />
            <Tanlov />
            <Maxsulotlar />
            <Contacts />
        </Stack>
    );
}

export default App;
