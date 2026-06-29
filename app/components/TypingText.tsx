'use client'

import { TypeAnimation } from "react-type-animation";

const TypingText = () => {
    return (
        <TypeAnimation
            sequence={[
                "Premium Ajrakh & Bagru collection in pure cotton, made for you.",
                4000,
                "Authentic hand block prints crafted by artisans, made for you.",
                4000,
                "Timeless heritage designs in breathable fabrics, made for you.",
                4000,
            ]}
            wrapper="p"
            speed={55}
            repeat={Infinity}
            className="text-sm md:text-base text-[#5c404f] font-medium leading-relaxed max-w-md text-left"
        />
    );
};

export default TypingText;