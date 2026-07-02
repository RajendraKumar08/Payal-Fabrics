'use client'

import { Playfair_Display, Poppins } from 'next/font/google'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const contactInfo = [
    {
        type: 'Email',
        icon: '✉️',
        values: ['gulshanteilor12345@gmail.com'],
    },
    {
        type: 'Phone',
        icon: '📞',
        values: ['+91 98989 76916'],
    },
    {
        type: 'Address',
        icon: '📍',
        values: ['Shop No. 6, Payal Tailor, Decent Apartment, near Bus Depo Gandevi, Navsari, Gujarat 396360'],
    },
];

export default function Contact() {
    return (
        <main className={`min-h-screen bg-[#faf6f0] text-slate-800 ${poppins.className}`}>

            {/* ── Hero Banner ── */}
            <section className="relative bg-gradient-to-br from-[#e5d5c5] to-[#f4eae1] py-12 md:py-20 px-4 md:px-6 text-center overflow-hidden border-b border-pink-100/50">
                <span className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-pink-100/30 blur-2xl" />
                <span className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/20 blur-2xl" />

                <p className="text-xs uppercase tracking-[0.25em] text-[#7d5069] font-bold mb-3">Payal Fabrics</p>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#3c1e2e] tracking-tight ${playfair.className}`}>
                    Get in Touch
                </h1>
                <p className="mt-3 text-[#5c404f] text-sm md:text-base max-w-md mx-auto leading-relaxed font-semibold">
                    We&apos;d love to hear from you — reach out anytime for custom requests, fabric bookings or orders!
                </p>

                {/* Accent Divider with mandala icon */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
                    <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                    <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">

                {/* ── Contact Info Panel ── */}
                <div className="flex flex-col gap-6 mb-12">
                    <div>
                        <h2 className={`text-2xl md:text-3xl font-extrabold text-[#3c1e2e] tracking-tight mb-1.5 ${playfair.className}`}>
                            Contact Details
                        </h2>
                        <p className="text-[#7d5069] text-xs font-bold uppercase tracking-wider">Find us through any of the channels below.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactInfo.map((info) => (
                            <div
                                key={info.type}
                                className="bg-white border border-pink-100/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{info.icon}</span>
                                    <span className="text-xs font-extrabold text-[#3c1e2e] uppercase tracking-widest">{info.type}</span>
                                </div>
                                <ul className="flex flex-col gap-1.5 pl-9">
                                    {info.values.map((val) => (
                                        <li key={val} className="text-[#5c404f] text-sm font-semibold leading-relaxed">{val}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Business Hours */}
                        <div className="bg-white border border-pink-100/50 rounded-2xl p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">🕐</span>
                                <span className="text-xs font-extrabold text-[#3c1e2e] uppercase tracking-widest">Business Hours</span>
                            </div>
                            <ul className="text-sm text-[#5c404f] flex flex-col gap-2 pl-9 font-semibold">
                                <li>Mon – Sat: <span className="font-bold text-[#3c1e2e]">10:00 AM – 8:00 PM</span></li>
                                <li>Purnima (Full moon): <span className="font-bold text-red-600">Closed</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WhatsApp CTA Section ── */}
            <section className="relative bg-gradient-to-br from-[#faf6f0] via-[#e8f5e9]/30 to-[#f4eae1] py-12 md:py-20 px-4 md:px-6 overflow-hidden border-t border-pink-100/50">
                <span className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-pink-100/20 blur-3xl" />
                <span className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-green-100/10 blur-3xl" />

                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 text-[#3c1e2e] tracking-tight ${playfair.className}`}>
                        Let&apos;s Chat on WhatsApp!
                    </h2>
                    <p className="text-[#5c404f] text-sm md:text-base mb-8 max-w-lg mx-auto font-semibold leading-relaxed">
                        Have a question? Want to custom design your dress or place an order? We&apos;re here to help! Connect with us directly on WhatsApp for quick responses.
                    </p>

                    <a
                        href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#4d243d] hover:bg-[#5e2e4b] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-pink-900/10 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer"
                    >
                        {/* Inline WhatsApp Logo in white */}
                        <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.578 2.019 14.1 1.002 11.997 1.002c-5.439 0-9.862 4.37-9.866 9.8-.001 1.762.47 3.487 1.366 5.023L2.493 20.4l4.154-1.246zm11.758-6.732c-.3-.15-1.782-.88-2.057-.98-.275-.1-.475-.15-.675.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-3.579-1.79-4.975-3.007-6.68-5.925-.3-.515.3-.48.86-1.6.15-.3.075-.562-.038-.787-.113-.225-.9-2.175-1.237-2.987-.33-.795-.669-.687-.923-.7-.2-.01-.425-.01-.65-.01-.225 0-.587.085-.894.42-.307.335-1.175 1.15-1.175 2.805 0 1.656 1.206 3.256 1.37 3.481.165.224 2.373 3.623 5.75 5.083.803.347 1.431.554 1.921.71.807.257 1.543.221 2.125.135.648-.096 1.782-.729 2.03-1.435.25-.705.25-1.31.175-1.435-.075-.125-.275-.2-.575-.35z"/>
                        </svg>
                        <span>Chat Now on WhatsApp</span>
                    </a>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Instant Response Card */}
                        <div className="bg-white border border-pink-100/40 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#4d243d]/5 flex items-center justify-center mb-4 shrink-0">
                                <svg className="w-6 h-6 text-[#7d5069]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#3c1e2e] mb-1.5 text-sm uppercase tracking-wider">Instant Response</h3>
                            <p className="text-xs text-[#5c404f] font-semibold leading-relaxed">Get quick, direct answers to all your design queries.</p>
                        </div>

                        {/* Easy Ordering Card */}
                        <div className="bg-white border border-pink-100/40 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#4d243d]/5 flex items-center justify-center mb-4 shrink-0">
                                <svg className="w-6 h-6 text-[#7d5069]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#3c1e2e] mb-1.5 text-sm uppercase tracking-wider">Easy Ordering</h3>
                            <p className="text-xs text-[#5c404f] font-semibold leading-relaxed">Browse catalog products and place orders directly with us.</p>
                        </div>

                        {/* Personal Touch Card */}
                        <div className="bg-white border border-pink-100/40 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-xl bg-[#4d243d]/5 flex items-center justify-center mb-4 shrink-0">
                                <svg className="w-6 h-6 text-[#7d5069]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#3c1e2e] mb-1.5 text-sm uppercase tracking-wider">Personal Touch</h3>
                            <p className="text-xs text-[#5c404f] font-semibold leading-relaxed">Communicate directly with our master tailors and team.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}