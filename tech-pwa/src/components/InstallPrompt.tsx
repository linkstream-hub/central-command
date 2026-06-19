"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("apt_install_dismissed");
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    const handler = (e: Event) => { e.preventDefault(); setDeferredPrompt(e as BeforeInstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handler);
    const timer = setTimeout(() => setShow(true), 30000);
    return () => { window.removeEventListener("beforeinstallprompt", handler); clearTimeout(timer); };
  }, []);

  const install = () => {
    if (deferredPrompt?.prompt) {
      deferredPrompt.prompt();
    }
    setShow(false);
  };

  const dismiss = () => {
    localStorage.setItem("apt_install_dismissed", String(Date.now()));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-card)] border-t border-[var(--border-subtle)] rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-white font-black text-lg">APT</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--text-primary)]">Add to Home Screen</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Works offline — one tap away</p>
            </div>
            <button onClick={dismiss} className="text-[var(--text-muted)] p-1 hover:text-[var(--text-primary)] transition"><X size={18} /></button>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={install}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl py-3 flex items-center justify-center gap-2 transition active:scale-[0.98]">
              <Download size={16} /> Install
            </button>
            <button onClick={dismiss}
              className="flex-1 text-[var(--text-muted)] font-medium rounded-2xl py-3 border border-[var(--border-subtle)] hover:bg-white/5 transition active:scale-[0.98]">
              Not Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
