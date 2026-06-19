"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

type ToastType = "success" | "error" | "info" | "warning";
interface ToastItem { id: number; message: string; type: ToastType; }

const ToastContext = createContext<{
  toast: { success: (m: string) => void; error: (m: string) => void; info: (m: string) => void; warning: (m: string) => void }
}>({ toast: { success: () => {}, error: () => {}, info: () => {}, warning: () => {} } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const add = useCallback((message: string, type: ToastType) => {
    const id = ++counterRef.current;
    setToasts(curr => [...curr, { id, message, type }]);
    setTimeout(() => setToasts(curr => curr.filter(t => t.id !== id)), 4000);
  }, []);

  const toast = {
    success: (m: string) => add(m, "success"),
    error:   (m: string) => add(m, "error"),
    info:    (m: string) => add(m, "info"),
    warning: (m: string) => add(m, "warning"),
  };

  const borderColors = {
    success: "border-l-green-500",
    error:   "border-l-red-500",
    info:    "border-l-blue-500",
    warning: "border-l-amber-500",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-80 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`bg-[var(--surface-raised)] border border-[var(--border-subtle)] border-l-4 ${borderColors[t.type]} rounded-xl px-4 py-3 shadow-2xl text-sm text-[var(--text-primary)] font-medium`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
