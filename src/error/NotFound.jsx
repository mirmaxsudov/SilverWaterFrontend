import NotFoundImage from "../assets/error/not-found.png";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import PropTypes from "prop-types";

const NotFound = () => {
    return (
        <section className="not-found-section overflow-hidden h-screen relative select-none">
            <div className="container mx-auto h-full px-4">
                <div className="flex flex-col justify-center items-center h-full">
                    {/* Animated and responsive image */}
                    <motion.img
                        src={NotFoundImage}
                        alt="Not Found image"
                        className="w-full max-w-md h-auto"
                        initial={{opacity: 0, y: -30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    />

                    {/* Animated and responsive heading */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-4 text-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3, duration: 0.5}}
                    >
                        Bu oyna topilmadi
                    </motion.h1>

                    {/* Animated and responsive paragraph */}
                    <motion.p
                        className="text-sm sm:text-base md:text-lg text-[#CBCBCB] text-center mt-2"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 0.5}}
                    >
                        Bu sahifa mavjud emas yoki olib tashlangan! <br/>
                        Uyga qaytishingizni tavsiya qilamiz.
                    </motion.p>

                    {/* Animated and responsive button with interactive hover/tap effects */}
                    <Link to="/">
                        <motion.button
                            className="px-6 py-2 mt-6 bg-[#013690] rounded-lg text-white transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "#fff",
                                color: "#013690",
                                boxShadow: "0 0 0 2px #013690",
                            }}
                            whileTap={{scale: 0.95}}
                        >
                            Asosiy oynaga qaytish
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const NotFoundCircle = ({
                            left, top
                        }) => {
    console.log(left, top)
    return <div
        className={`not-found-circle w-[27px] h-[27px] bg-[#D9D9D9] rounded-full absolute left-[${left}] top-[100px]`}></div>
}

NotFoundCircle.propTypes = {
    left: PropTypes.string.isRequired, top: PropTypes.string.isRequired,
};

export default NotFound;