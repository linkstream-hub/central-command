import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "@/lib/types";
import { Clock, User, MapPin } from "lucide-react";

interface JobAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (hours: number, assignedTechs: string[]) => void;
  job: Job | null;
  primaryTech: string;
  startTime: string;
  roster: { techName: string; name: string; badge?: string | null }[];
}

export default function JobAssignmentModal({ isOpen, onClose, onConfirm, job, primaryTech, startTime, roster }: JobAssignmentModalProps) {
  const [hours, setHours] = useState(2);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && job) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHours(job.estimatedHours || 2);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTechs([primaryTech]);
    }
  }, [isOpen, job, primaryTech]);

  const toggleTech = (techName: string) => {
    if (techName === primaryTech) return; // Cannot remove primary
    if (selectedTechs.includes(techName)) {
      setSelectedTechs(selectedTechs.filter(t => t !== techName));
    } else {
      setSelectedTechs([...selectedTechs, techName]);
    }
  };

  if (!isOpen || !job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-[#0f1522] border border-[var(--border-subtle)] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full max-w-sm overflow-hidden"
        >
          <div className="p-4 border-b border-white/10 bg-black/40">
            <h2 className="text-sm font-black uppercase tracking-widest text-[var(--accent)]">Confirm Assignment</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-zinc-300 bg-white/5 p-3 rounded-lg border border-white/5">
                <MapPin size={16} className="mt-0.5 text-zinc-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">{job.address}</p>
                  <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mt-1">{job.serviceCategory}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-zinc-300 px-1">
                <User size={16} className="text-emerald-400 shrink-0 mt-1" />
                <div className="w-full">
                  <p className="text-sm font-bold text-white"><span className="text-zinc-500 mr-2 font-normal">Primary Tech:</span>{primaryTech}</p>
                  
                  {/* Additional Tech Selection */}
                  <div className="mt-4 border-t border-white/5 pt-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      Add Co-Assignees
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto custom-scrollbar pr-2">
                      {roster.filter(t => t.name !== primaryTech && t.name !== 'Unassigned').map(tech => {
                        const isSelected = selectedTechs.includes(tech.name);
                        return (
                          <button
                            key={tech.name}
                            onClick={() => toggleTech(tech.name)}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                              isSelected 
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                                : 'bg-white/5 text-zinc-400 border-transparent hover:bg-white/10'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{tech.name.split(' ')[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-zinc-300 px-1">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <p className="text-sm font-bold text-white"><span className="text-zinc-500 mr-2 font-normal">Time:</span>{startTime}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center">
                Estimated Duration
              </label>
              <div className="flex items-center justify-center gap-4">
                <button 
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors hover:border-red-400/50 hover:text-red-400"
                >
                  <span className="text-2xl mb-1">-</span>
                </button>
                <div className="w-20 text-center">
                  <span className="text-3xl font-black text-white">{hours}</span>
                  <span className="text-sm font-bold text-zinc-500 ml-1">hrs</span>
                </div>
                <button 
                  onClick={() => setHours(hours + 1)}
                  className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
                >
                  <span className="text-2xl mb-1">+</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-black/40">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-[11px] font-black text-zinc-400 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(hours, selectedTechs)}
              className="px-6 py-2.5 rounded-lg text-[11px] font-black bg-[var(--accent)] text-black hover:bg-[#00c8f0] transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(0,180,216,0.4)]"
            >
              Confirm Drop
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
