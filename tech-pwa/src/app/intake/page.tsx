"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitIntakeForm } from "./actions";

export default function IntakePage() {
  const [type, setType] = useState<"work_order" | "lead" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleAction(formData: FormData) {
    if (!type) return;
    formData.append("type", type);
    const res = await submitIntakeForm(Object.fromEntries(formData));
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Error submitting form: " + res.error);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a1128] text-white flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 p-8 rounded-xl border border-white/10 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#f5b900] mb-4">Thank you</h2>
          <p className="text-gray-300 mb-6">Your request has been received. Our team will review it shortly.</p>
          <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-[#f5b900] text-[#0a1128] font-semibold rounded-lg hover:bg-yellow-400 transition-colors w-full">Return Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1128] text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Submit a Request</h1>
        
        <AnimatePresence mode="wait">
          {!type ? (
            <motion.div key="router" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-2 gap-6">
              <button 
                onClick={() => setType("work_order")}
                className="p-8 border-2 border-white/10 rounded-xl hover:border-[#f5b900] bg-white/5 hover:bg-white/10 transition-all text-left group"
              >
                <h3 className="text-xl font-bold text-[#f5b900] mb-2 group-hover:scale-105 transform origin-left transition-transform">Maintenance Request (Existing Client)</h3>
                <p className="text-sm text-gray-400">Submit a work order for an existing property managed by APT.</p>
              </button>
              
              <button 
                onClick={() => setType("lead")}
                className="p-8 border-2 border-white/10 rounded-xl hover:border-[#f5b900] bg-white/5 hover:bg-white/10 transition-all text-left group"
              >
                <h3 className="text-xl font-bold text-[#f5b900] mb-2 group-hover:scale-105 transform origin-left transition-transform">New Service Inquiry</h3>
                <p className="text-sm text-gray-400">Interested in using APT for your properties? Get in touch here.</p>
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10">
              <button onClick={() => setType(null)} className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-2">
                ← Back
              </button>
              
              <form action={handleAction} className="space-y-6">
                {type === "work_order" && (
                  <>
                    <h2 className="text-2xl font-bold text-[#f5b900] border-b border-white/10 pb-4">Work Order Details</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium">Property Address *</label>
                        <input id="address" name="address" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] focus:ring-1 focus:ring-[#f5b900] outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="unit" className="block text-sm font-medium">Unit</label>
                        <input id="unit" name="unit" className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] focus:ring-1 focus:ring-[#f5b900] outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium">Service Type *</label>
                        <select id="category" name="category" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none">
                          <option value="">-- Select --</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="General Repair">General Repair</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="priority" className="block text-sm font-medium">Priority *</label>
                        <select id="priority" name="priority" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none">
                          <option value="">-- Select --</option>
                          <option value="ASAP">ASAP (Safety/Habitability)</option>
                          <option value="48 Hours">Within 48 Hours</option>
                          <option value="Routine">Routine</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="block text-sm font-medium">Description of Issue *</label>
                      <textarea id="description" name="description" required rows={4} className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none resize-y"></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="pte" className="block text-sm font-medium">Permission to Enter *</label>
                        <select id="pte" name="pte" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none">
                          <option value="">-- Select --</option>
                          <option value="Yes">Yes — enter without tenant present</option>
                          <option value="No">No — must coordinate</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="rmName" className="block text-sm font-medium">Your Name (Manager) *</label>
                        <input id="rmName" name="rmName" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="rmEmail" className="block text-sm font-medium">Your Email *</label>
                      <input id="rmEmail" name="rmEmail" type="email" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none" />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#f5b900] text-[#0a1128] font-bold rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider text-sm">
                      Submit Request
                    </button>
                  </>
                )}

                {type === "lead" && (
                  <>
                    <h2 className="text-2xl font-bold text-[#f5b900] border-b border-white/10 pb-4">Inquiry Details</h2>
                    
                    <div className="space-y-2">
                      <label htmlFor="clientName" className="block text-sm font-medium">Name *</label>
                      <input id="clientName" name="clientName" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="managerEmail" className="block text-sm font-medium">Email *</label>
                      <input id="managerEmail" name="managerEmail" type="email" required className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="notes" className="block text-sm font-medium">Tell us what you need *</label>
                      <textarea id="notes" name="notes" required rows={4} className="w-full bg-[#0a1128] border border-white/20 rounded-lg p-3 text-white focus:border-[#f5b900] outline-none resize-y"></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#f5b900] text-[#0a1128] font-bold rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-wider text-sm">
                      Submit Inquiry
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
