"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Hammer } from "lucide-react";
import { motion } from "framer-motion";

export default function IntelComingSoonPage() {
  return (
    <DashboardLayout>
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", ease: "easeInOut" }}
          className="text-accent"
        >
          <Hammer size={64} />
        </motion.div>
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase italic">
            Intelligence <span className="text-accent">Hub</span>
          </h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.4em]">
            Module offline — AI systems in incubator
          </p>
        </div>

        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-accent opacity-50"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
