import React from 'react';
import sileoLogoImg from '../assets/images/sileo_logo_official_1787294307226.jpg';

interface SileoLogoProps {
  variant?: 'header' | 'hero' | 'results' | 'badge';
  className?: string;
}

export const SileoLogo: React.FC<SileoLogoProps> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
        <img
          src={sileoLogoImg}
          alt="SILEO México Online"
          referrerPolicy="no-referrer"
          className="h-9 sm:h-10 w-auto object-contain rounded-lg border border-[#0066FF]/40 bg-[#000000] shadow-md shadow-[#0066FF]/20"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-['Outfit',sans-serif] font-black text-lg sm:text-xl tracking-wider text-[#FFFFFF]">
              RETO <span className="bg-gradient-to-r from-[#0066FF] via-[#6C2BD9] to-[#E83E8C] bg-clip-text text-transparent">SILEO</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#0B1F3A] text-[#B7D600] border border-[#B7D600]/40">
              45s
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-[#FFFFFF]/70 font-medium">
            Agilidad Mental & Neuroentrenamiento
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'results') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="p-2 rounded-2xl bg-[#000000] border border-[#0066FF]/50 shadow-xl shadow-[#0066FF]/20 mb-3">
          <img
            src={sileoLogoImg}
            alt="SILEO México Online"
            referrerPolicy="no-referrer"
            className="h-16 sm:h-20 w-auto object-contain rounded-xl"
          />
        </div>
      </div>
    );
  }

  // Hero / Start Screen (Centered & Elegant)
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative group p-2 sm:p-3 rounded-2xl bg-[#000000] border-2 border-[#0066FF]/60 shadow-2xl shadow-[#0066FF]/30 hover:border-[#B7D600]/70 transition-all">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF] via-[#6C2BD9] via-[#E83E8C] to-[#B7D600] rounded-2xl blur-md opacity-35 group-hover:opacity-60 transition-opacity -z-10" />
        <img
          src={sileoLogoImg}
          alt="SILEO México Online"
          referrerPolicy="no-referrer"
          className="h-24 sm:h-32 md:h-36 w-auto object-contain rounded-xl"
        />
      </div>
    </div>
  );
};
