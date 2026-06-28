'use client'

import { Dancing_Script, Poppins } from 'next/font/google'

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
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
        <main className={`min-h-screen bg-slate-50 ${poppins.className}`}>

            {/* ── Hero Banner ── */}
            <section className="relative bg-slate-950 py-16 px-6 text-center overflow-hidden">
                <span className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gray-200/40 blur-2xl" />
                <span className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-slate-100/40 blur-2xl" />

                <p className="text-sm uppercase tracking-widest text-purple-600 mb-2">Payal Fabrics</p>
                <h1 className={`text-5xl md:text-6xl font-bold text-white drop-shadow-md ${dancingScript.className}`}>
                    Get in Touch
                </h1>
                <p className="mt-3 text-gray-300 text-base max-w-md mx-auto">
                    We&apos;d love to hear from you — reach out anytime!
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="block h-px w-16 bg-slate-200" />
                    <span className="text-purple-500 text-lg">✦</span>
                    <span className="block h-px w-16 bg-slate-200" />
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="max-w-6xl mx-auto px-6 py-16">

                {/* ── Contact Info Panel ── */}
                <div className="flex flex-col gap-6 mb-12">
                    <div>
                        <h2 className={`text-3xl text-slate-900 mb-1 ${dancingScript.className}`}>Contact Details</h2>
                        <p className="text-slate-500 text-sm">Find us through any of the channels below.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactInfo.map((info) => (
                            <div
                                key={info.type}
                                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{info.icon}</span>
                                    <span className="text-sm font-semibold text-black uppercase tracking-widest">{info.type}</span>
                                </div>
                                <ul className="flex flex-col gap-1.5">
                                    {info.values.map((val) => (
                                        <li key={val} className="text-slate-700 text-sm font-medium pl-9">{val}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Business Hours */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">🕐</span>
                                <span className="text-sm font-semibold text-black uppercase tracking-widest">Business Hours</span>
                            </div>
                            <ul className="text-sm text-slate-600 flex flex-col gap-1 pl-9">
                                <li>Mon – Sat: <span className="font-medium text-slate-800">10:00 AM – 8:00 PM</span></li>
                                <li>Purnima (Full moon): <span className="font-medium text-black">Closed</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WhatsApp CTA Section ── */}
            <section className="relative bg-gradient-to-r from-green-50 via-white to-green-50 py-20 px-6 overflow-hidden">
                <span className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-green-200/30 blur-3xl" />
                <span className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-green-100/30 blur-3xl" />

                <div className="max-w-2xl mx-auto text-center relative z-10">
                    <h2 className={`text-4xl md:text-5xl mb-4 text-slate-900 ${dancingScript.className}`}>
                        Let&apos;s Chat on WhatsApp!
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
                        Have a question? Want to place an order? We&apos;re here to help! Connect with us directly on WhatsApp for quick responses.
                    </p>

                    <a
                        href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        <span className="text-2xl">💬</span>
                        <span>Chat Now on WhatsApp</span>
                        <span className="text-xl">→</span>
                    </a>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-green-100">
                            <span className="text-4xl block mb-2">⚡</span>
                            <h3 className="font-semibold text-slate-900 mb-1">Instant Response</h3>
                            <p className="text-sm text-slate-600">Get quick answers to your queries</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-green-100">
                            <span className="text-4xl block mb-2">🛍️</span>
                            <h3 className="font-semibold text-slate-900 mb-1">Easy Ordering</h3>
                            <p className="text-sm text-slate-600">Place orders directly via WhatsApp</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-green-100">
                            <span className="text-4xl block mb-2">🤝</span>
                            <h3 className="font-semibold text-slate-900 mb-1">Personal Touch</h3>
                            <p className="text-sm text-slate-600">Direct communication with our team</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}