"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
        <span className="text-[11px] text-white/15 font-mono">
          © 2026 Bruno Lionel Raj M
        </span>
        <span className="text-[11px] text-white/10">
          Built with precision.
        </span>
      </div>
    </footer>
  );
}