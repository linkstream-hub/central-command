"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, UploadCloud, XCircle, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { apiCall } from "@/lib/syncQueue";

interface CameraUploadProps {
  photoType: 'before' | 'after' | 'receipt';
  jobId: string;
  label?: string;
  onSuccess?: () => void;
}

export default function CameraUpload({ photoType, jobId, label, onSuccess }: CameraUploadProps) {
  const { t } = useTranslation();
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'failed' | 'success'>('idle');
  const [fileName, setFileName] = useState('');

  const displayLabel = label || t(`camera_${photoType}`) || `${photoType.replace(/^\w/, (c) => c.toUpperCase())} Documentation`;

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(`${photoType}_${jobId}_${Date.now()}.jpg`);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
      setStatus('idle');
    };
    reader.readAsDataURL(file);
  };

  const uploadPhoto = async () => {
    if (!fileBase64) return;
    setStatus('uploading');

    try {
      // Third parameter false means DO NOT ALLOW QUEUEING
      const res = await apiCall("uploadReceipt", {
        jobId,
        photoType,
        photoBase64: fileBase64,
        fileName
      }, false); 

      if (res.success) {
        setStatus('success');
        if (onSuccess) onSuccess();
        // Clear after a few seconds
        setTimeout(() => {
          setFileBase64(null);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('failed');
      }
    } catch {
      setStatus('failed');
    }
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3 shadow-sm">
      {fileBase64 === null ? (
        <label className="flex items-center justify-between w-full py-4 px-5 bg-black/20 text-[var(--text-primary)] font-bold rounded-xl border border-white/5 cursor-pointer active:scale-[0.98] transition">
          <div className="flex items-center gap-3">
            <Camera size={20} className="text-blue-500" />
            <span className="text-xs uppercase tracking-widest">{displayLabel}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
             <Camera size={14} />
          </div>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={handleCapture}
          />
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40 shadow-inner">
            <Image 
              src={fileBase64} 
              alt="Preview" 
              width={640}
              height={360}
              className="w-full h-full object-cover" 
              unoptimized 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <button 
              onClick={() => { setFileBase64(null); setStatus('idle'); }}
              disabled={status === 'uploading' || status === 'success'}
              className="absolute top-3 right-3 p-2 bg-black/80 rounded-xl text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              <XCircle size={18} />
            </button>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/40 px-2 py-1 rounded backdrop-blur-md">{t('camera_ready')}</span>
            </div>
          </div>

          {status === 'idle' && (
            <button 
              onClick={uploadPhoto}
              className="flex items-center justify-center space-x-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
              <UploadCloud size={18} />
              <span className="text-[10px]">{t('btn_camera_upload')}</span>
            </button>
          )}

          {status === 'uploading' && (
            <div className="flex items-center justify-center space-x-3 w-full py-4 bg-blue-600/20 text-blue-400 font-black uppercase tracking-[0.2em] rounded-xl border border-blue-500/20">
              <RefreshCw size={18} className="animate-spin" />
              <span className="text-[10px]">{t('camera_uploading')}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center justify-center space-x-3 w-full py-4 bg-green-500/10 text-green-400 font-black uppercase tracking-[0.2em] rounded-xl border border-green-500/20">
              <CheckCircle size={18} />
              <span className="text-[10px]">{t('camera_success')}</span>
            </div>
          )}

          {status === 'failed' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-500/20 leading-snug">
                <AlertCircle size={18} className="shrink-0" />
                <span>{t('camera_error')}</span>
              </div>
              <button 
                onClick={uploadPhoto}
                className="flex items-center justify-center space-x-2 w-full py-4 bg-[var(--bg-surface)] border border-red-500/30 text-white font-black uppercase tracking-[0.2em] rounded-xl active:scale-[0.98] transition hover:bg-white/5"
              >
                <span className="text-[10px]">{t('btn_camera_retry')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
