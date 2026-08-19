"use client";

export default function StoryMarker({
  label,
  center = false,
}: {
  label: string;
  center?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
      <div className="w-6 h-px bg-[#00D4FF]" />
      <span className="text-[#00D4FF] text-sm font-mono uppercase tracking-widest">{label}</span>
    </div>
  );
}
