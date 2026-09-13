"use client";
import { motion } from "framer-motion";

export default function InProgress() {
  return (
    <section className="px-6 md:px-12 pb-20 w-full max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold font-headline text-[#022c22] mb-6">
          Experience.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.06)] hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-[#10b981] mb-8 flex items-center justify-center shadow-lg shadow-[#10b981]/30 text-white">
            <span className="material-symbols-outlined text-3xl">model_training</span>
          </div>
          <h4 className="text-3xl font-extrabold font-headline text-[#022c22] mb-2 leading-tight">Akeshya Pvt Ltd</h4>
          <span className="inline-block text-[#10b981] font-bold text-lg mb-6 tracking-wide">AI Intern</span>
          <p className="text-xl text-[#064e3b]/80 font-medium mb-10 leading-relaxed">Built and integrated complex RAG agents for document workflows using HuggingFace & FAISS, boosting retrieval speed by 25%.</p>
          <span className="text-sm font-extrabold text-[#94a3b8] uppercase tracking-widest block pt-6 border-t border-gray-100">Jun '24 - Jul '25</span>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.06)] hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-[#059669] mb-8 flex items-center justify-center shadow-lg shadow-[#059669]/30 text-white">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
          <h4 className="text-3xl font-extrabold font-headline text-[#022c22] mb-2 leading-tight">DSU MUNS Club</h4>
          <span className="inline-block text-[#059669] font-bold text-lg mb-6 tracking-wide">Lead Web Developer</span>
          <p className="text-xl text-[#064e3b]/80 font-medium mb-10 leading-relaxed">Directed the development team utilizing ReactJS & Vite. Formulated event scheduling engines boosting applications by 60%.</p>
          <span className="text-sm font-extrabold text-[#94a3b8] uppercase tracking-widest block pt-6 border-t border-gray-100">May '25 - Present</span>
        </motion.div>

      </div>
    </section>
  );
}
