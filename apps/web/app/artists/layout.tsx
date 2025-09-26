import React from "react";

export default function ArtistsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0e0e0f] !p-0">
      {children}
    </div>
  );
} 