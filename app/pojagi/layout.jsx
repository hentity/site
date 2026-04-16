"use client";

export default function PojagiLayout({ children }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-hidden">
      {children}
    </div>
  );
}
