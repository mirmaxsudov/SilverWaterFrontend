import styles from "./Carousel.module.css";
import { Button } from "@mui/material";

import water1 from "../../../assets/112.png";
import water2 from "../../../assets/113.png";
import water3 from "../../../assets/114.png";
import water5 from "../../../assets/116.png";

const Carousel = () => {
    return (
        <div className={styles.body}>
            <div className={styles.slider}>
                <div className={styles.card}>
                    <div className={styles.img}>
                        <img src={water1} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>0.33L</div>
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
                </div>
                <div className={styles.card}>
                    <div className={styles.img}>
                        <img src={water2} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>1L</div>
                        <Button
                            component={"a"}
                            href={"#"}
                            variant="contained"
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
                </div>
                <div className={styles.card}>
                    <div className={styles.img}>
                        <img src={water3} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>0.5L</div>
                        <Button
                            component={"a"}
                            href={"#"}
                            variant="contained"
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
                </div>
                <div className={styles.card}>
                    <div className={styles.img}>
                        <img src={water5} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>1.5L</div>
                        <Button
                            component={"a"}
                            href={"#"}
                            variant="contained"
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
                </div>
            </div>
        </div>
    );
};

export default Carousel;
