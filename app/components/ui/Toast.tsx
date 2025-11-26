"use client";

import React, { useEffect } from 'react';

type ToastProps = { message: string; type?: 'success' | 'error' | 'info'; onClose?: () => void };

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-600';

  return (
    <div className={`fixed top-6 right-6 z-50 ${bg} text-white px-4 py-2 rounded shadow`} role="status">
      {message}
    </div>
  );
}
