"use client";
import { motion } from "framer-motion";

export default function Education() {
    return (
        <section className="px-6 md:px-12 w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-extrabold font-headline text-[#022c22] mb-6">
                    Pathways.
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#10b981]/10 p-12 rounded-[3rem] flex flex-col justify-center min-h-[300px]"
                    >
                        <span className="text-sm font-extrabold text-[#10b981] mb-6 block tracking-widest uppercase">Sept 2023 - Present</span>
                        <h3 className="text-4xl font-extrabold font-headline text-[#022c22] mb-4">Dayananda Sagar University</h3>
                        <p className="text-xl font-medium text-[#064e3b] mb-8">BTech Computer Science & Engineering</p>
                        <div className="inline-block self-start bg-white border border-[#10b981]/20 text-[#10b981] px-6 py-2 rounded-full text-lg font-bold shadow-sm">
                            CGPA 8.4
                        </div>
                    </motion.div>

                    {/* Additional certs below it simply */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.05)] border-4 border-transparent hover:border-[#10b981]/10 transition-colors"
                    >
                        <span className="text-sm font-extrabold text-[#94a3b8] mb-4 block tracking-widest uppercase">Jun 2021 - Mar 2023</span>
                        <h3 className="text-2xl font-extrabold font-headline text-[#022c22] mb-2">Narayana Junior College</h3>
                        <p className="text-lg font-medium text-[#064e3b]/70">Secondary Education — 86.4%</p>
                    </motion.div>
                </div>

                <div className="flex flex-col gap-6">
                    {[
                        {
                            title: "SysAdmin Certified",
                            issuer: "ServiceNow",
                            icon: "admin_panel_settings",
                            color: "bg-[#064e3b]"
                        },
                        {
                            title: "Responsive Web",
                            issuer: "freeCodeCamp",
                            icon: "devices",
                            color: "bg-[#059669]"
                        },
                        {
                            title: "Full Stack Dev",
                            issuer: "Udemy",
                            icon: "layers",
                            color: "bg-[#10b981]"
                        }
                    ].map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center gap-8 bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_60px_rgba(16,185,129,0.08)] hover:-translate-y-1 transition-all"
                        >
                            <div className={`${cert.color} text-white w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-lg`}>
                                <span className="material-symbols-outlined text-[32px]">{cert.icon}</span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-[#10b981] mb-2 uppercase tracking-widest">{cert.issuer}</p>
                                <h4 className="text-2xl font-extrabold font-headline text-[#022c22] leading-tight">{cert.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
