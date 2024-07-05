import styles from "./Carousel.module.css";
import { Button, Box } from "@mui/material";

import water1 from "../../../assets/0.33litr.jpg";
import water2 from "../../../assets/0.5litr.jpg";
import water3 from "../../../assets/1litr.jpg";
import water4 from "../../../assets/1_5water.jpg";
import water6 from "../../../assets/5litr.jpg";
import water7 from "../../../assets/10litr.jpg";

const products = [
    {
        id: 1,
        title: "0.33L",
        img: water1,
    },
    {
        id: 2,
        title: "0.5L",
        img: water2,
    },
    {
        id: 3,
        title: "1L",
        img: water3,
    },
    {
        id: 4,
        title: "1.5L",
        img: water4,
    },

    {
        id: 6,
        title: "5L",
        img: water6,
    },
    {
        id: 7,
        title: "10L",
        img: water7,
    },
];

const Carousel = () => {
    return (
        <div className={styles.body}>
            <Box
                className={styles.slider}
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
            >
                {products.map((product) => (
                    <Box
                        gridColumn={{
                            xs: "span 12",
                            sm: "span 6",
                            md: "span 6",
                            lg: "span 6",
                            xl: "span 3",
                        }}
                        className={styles.card}
                        key={product.id}
                    >
                        <Box className={styles.img}>
                            <img src={product.img} />
                        </Box>
                        <div className={styles.content}>
                            <div className={styles.title}>{product.title}</div>
                            <Button
                                variant="contained"
                                component={"a"}
                                href={"#"}
                                sx={{
                                    bgcolor: "primary",
                                    color: "white",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        bgcolor: "black",
                                        color: "white",
                                    },
                                    textTransform: "none",
                                }}
                            >
                                Buyurtma Qilish
                            </Button>
                        </div>
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Carousel;
