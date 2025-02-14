import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../App/Header.jsx";
import BizHaqimizda from "../App/BizHaqimizda.jsx";
import Tanlov from "../App/Tanlov.jsx";
import Maxsulotlar from "../App/Maxsulotlar.jsx";
import Contacts from "../App/Contacts.jsx";
import {Stack} from "@mui/material";

const Home = () => {
    return <>
        <Stack sx={{position: "relative"}} m={"auto"}>
            <Navbar/>
            <Header/>
            <BizHaqimizda/>
            <Tanlov/>
            <Maxsulotlar/>
            <Contacts/>
        </Stack>
    </>
}

export default Home;