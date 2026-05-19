'use client'

import { Dancing_Script, Poppins } from 'next/font/google'
import { useState } from 'react'

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
        values: ['rkdbprjr343040@gmail.com', 'golasumit55@gamil.com'],
    },
    {
        type: 'Phone',
        icon: '📞',
        values: ['+91 82338 80779', '+91 79838 17141'],
    },
    {
        type: 'Address',
        icon: '📍',
        values: ['123, Textile Market, Jaipur, Rajasthan — 302001'],
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire up to email API
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <main className={`min-h-screen bg-gradient-to-b from-pink-50 to-white ${poppins.className}`}>

            {/* ── Hero Banner ── */}
            <section className="relative bg-gradient-to-r from-pink-700 via-pink-500 to-rose-400 text-white py-16 px-6 text-center overflow-hidden">
                <span className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                <span className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

                <p className="text-sm uppercase tracking-widest text-pink-100 mb-2">Payal Fabrics</p>
                <h1 className={`text-5xl md:text-6xl font-bold drop-shadow-md ${dancingScript.className}`}>
                    Get in Touch
                </h1>
                <p className="mt-3 text-pink-100 text-base max-w-md mx-auto">
                    We&apos;d love to hear from you — reach out anytime!
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="block h-px w-16 bg-pink-200/60" />
                    <span className="text-pink-200 text-lg">✦</span>
                    <span className="block h-px w-16 bg-pink-200/60" />
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* ── Contact Info Panel ── */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className={`text-3xl text-pink-700 mb-1 ${dancingScript.className}`}>Contact Details</h2>
                        <p className="text-gray-500 text-sm">Find us through any of the channels below.</p>
                    </div>

                    {contactInfo.map((info) => (
                        <div
                            key={info.type}
                            className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{info.icon}</span>
                                <span className="text-sm font-semibold text-pink-600 uppercase tracking-widest">{info.type}</span>
                            </div>
                            <ul className="flex flex-col gap-1.5">
                                {info.values.map((val) => (
                                    <li key={val} className="text-gray-700 text-sm font-medium pl-9">{val}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Business Hours */}
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">🕐</span>
                            <span className="text-sm font-semibold text-pink-600 uppercase tracking-widest">Business Hours</span>
                        </div>
                        <ul className="text-sm text-gray-600 flex flex-col gap-1 pl-9">
                            <li>Mon – Sat: <span className="font-medium text-gray-800">10:00 AM – 7:00 PM</span></li>
                            <li>Sunday: <span className="font-medium text-pink-500">Closed</span></li>
                        </ul>
                    </div>
                </div>

                {/* ── Mail Form ── */}
                <div className="bg-white border border-pink-100 rounded-2xl shadow-sm p-8">
                    <h2 className={`text-3xl text-pink-700 mb-1 ${dancingScript.className}`}>Send us a Message</h2>
                    <p className="text-gray-500 text-sm mb-6">Fill in the form below and we&apos;ll get back to you shortly.</p>

                    {sent && (
                        <div className="mb-5 px-4 py-3 rounded-xl bg-pink-50 border border-pink-300 text-pink-700 text-sm font-medium text-center">
                            ✅ Your message has been sent! We&apos;ll reply soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Priya Sharma"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Email</label>
                            <input
                                type="email"
                                required
                                placeholder="e.g. priya@email.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                            />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Order Inquiry"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                className="border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Write your message here..."
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-2 w-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold py-3 rounded-xl hover:from-pink-700 hover:to-rose-600 transition-all duration-300 shadow-md hover:shadow-lg tracking-wide"
                        >
                            Send Message ✉️
                        </button>
                    </form>
                </div>
            </section>

            {/* ── Bottom Banner ── */}
            <section className="bg-gradient-to-r from-rose-400 via-pink-500 to-pink-700 text-white text-center py-12 px-6">
                <h2 className={`text-3xl mb-3 ${dancingScript.className}`}>We&apos;re Here for You</h2>
                <p className="text-pink-100 text-sm max-w-lg mx-auto">
                    Whether it&apos;s a query, feedback, or just a hello — we&apos;re always happy to connect.
                </p>
            </section>
        </main>
    )
}