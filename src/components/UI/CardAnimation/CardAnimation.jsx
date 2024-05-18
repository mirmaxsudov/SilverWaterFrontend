import styles from "./cardAnimation.module.css";
import { useEffect, useState } from "react";

const CardAnimation = () => {
    const [activeCard, setActiveCard] = useState("c1");

    useEffect(() => {
        // This function runs every 3 seconds to cycle through the cards
        const interval = setInterval(() => {
            setActiveCard((prevCard) => {
                // Determine the next card based on the current card
                switch (prevCard) {
                    case "c1":
                        return "c2";
                    case "c2":
                        return "c3";
                    case "c3":
                        return "c4";
                    case "c4":
                        return "c1";
                    default:
                        return "c1";
                }
            });
        }, 3000); // Change every 3000 milliseconds (3 seconds)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this effect runs only once after the initial render

    const handleClick = (cardId) => {
        setActiveCard(cardId);
    };

    return (
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <input
                        className={styles.input}
                        type="radio"
                        name="slide"
                        id="c1"
                        checked={activeCard === "c1"}
                        readOnly
                    />
                    <label
                        htmlFor="c1"
                        className={styles.card}
                        onClick={() => handleClick("c1")}
                    >
                        <div className={styles.row}>
                            <div className={styles.icon}>1</div>
                            <div className={styles.description}>
                                <h4 className={styles.h4}>Noyob</h4>
                                <p className={styles.p}>
                                    Kumush bilan boyitilgan noyob tabiiy tarkib
                                </p>
                            </div>
                        </div>
                    </label>
                    <input
                        className={styles.input}
                        type="radio"
                        name="slide"
                        id="c2"
                        checked={activeCard === "c2"}
                        readOnly
                    />
                    <label
                        htmlFor="c2"
                        className={styles.card}
                        onClick={() => handleClick("c2")}
                    >
                        <div className={styles.row}>
                            <div className={styles.icon}>2</div>
                            <div className={styles.description}>
                                <h4 className={styles.h4}>
                                    Xalqaro Standartlar va Filtrlash
                                </h4>
                                <p className={styles.p}>
                                    Xalqaro standartlarga muvofiq keluvchi ko‘p
                                    bosqichli suvni tozalash va filtrlash tizimi
                                </p>
                            </div>
                        </div>
                    </label>

                    <input
                        className={styles.input}
                        type="radio"
                        name="slide"
                        id="c3"
                        checked={activeCard === "c3"}
                        readOnly
                    />
                    <label
                        htmlFor="c3"
                        className={styles.card}
                        onClick={() => handleClick("c3")}
                    >
                        <div className={styles.row}>
                            <div className={styles.icon}>3</div>
                            <div className={styles.description}>
                                <h4 className={styles.h4}>
                                    Yetkazib Berish Xizmati
                                </h4>
                                <p className={styles.p}>
                                    Savdo nuqtalari, xonadon yoki ofisingizgacha
                                    tez yetkazish xizmati
                                </p>
                            </div>
                        </div>
                    </label>

                    <input
                        className={styles.input}
                        type="radio"
                        name="slide"
                        id="c4"
                        checked={activeCard === "c4"}
                        readOnly
                    />
                    <label
                        htmlFor="c4"
                        className={styles.card}
                        onClick={() => handleClick("c4")}
                    >
                        <div className={styles.row}>
                            <div className={styles.icon}>4</div>
                            <div className={styles.description}>
                                <h4 className={styles.h4}>Hamyonbob</h4>
                                <p className={styles.p}>Jozibador narxlar</p>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CardAnimation;
