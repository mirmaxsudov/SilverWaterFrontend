import { motion } from 'framer-motion';

const text = "Tez orada ...";

// Container variant to stagger the appearance of each letter
const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Each letter's animation variant
const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Settings = () => {
    return (
        <section className="settings-section">
            <div className="container mx-auto h-screen flex justify-center items-center">
                <motion.h1
                    className="text-8xl text-center font-bold flex whitespace-pre"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {text.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>
            </div>
        </section>
    );
};

export default Settings;
