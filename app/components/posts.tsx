'use client'
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "700", "800"]
});

const reels = ["https://www.instagram.com/p/DLHPIVOS_bg/embed",
    "https://www.instagram.com/p/DZUu81fKa2a/embed",
    "https://www.instagram.com/p/DaIdeVVq2iC/embed"
]
const imageposts = ["https://www.instagram.com/p/DYnDrINkVmO/embed?img_index=1",
    "https://www.instagram.com/p/DQ6lWt1DDhs/embed",
    "https://www.instagram.com/p/DRkPrsSDNbC/embed?img_index=1"
]


const Posts = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 mt-5">
                <h1 className={`text-4xl md:text-5xl font-extrabold text-[#3c1e2e] tracking-tight mb-4 ${playfair.className}`}>See these smiles</h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
                    <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                    <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
                </div>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {imageposts.map((post, index) => (
                        <iframe
                            key={index}
                            src={post}
                            width="300"
                            height="533.33"
                            frameBorder="0"
                            scrolling="no"
                        />
                    ))}
                </div>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {reels.map((reel, index) => (
                        <iframe
                            key={index}
                            src={reel}
                            width="300"
                            height="533.33"
                            frameBorder="0"
                            scrolling="no"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Posts;