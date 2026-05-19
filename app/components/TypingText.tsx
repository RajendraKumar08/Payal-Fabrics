'use client'

import { TypeAnimation } from "react-type-animation";

const TypingText = () => {
    return (
        <TypeAnimation
            sequence={[
                "Elegant Designs",
                2000,
                "",
                500,
                "Premium Fabrics",
                2000,
                "",
                500,
                "Perfect Stitching",
                2000,
                "",
                500,
            ]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            className="text-xl md:text-2xl text-[#3E2A4D] font-light tracking-[4px]"
        />
    );
};

export default TypingText;