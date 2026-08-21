import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SileoLogo } from './SileoLogo';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onResetToIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  onResetToIntro
}) => {
  return (
    <header className="w-full border-b border-[#0066FF]/20 bg-[#0B1F3A]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Official Brand Logo Discreet in Header */}
        <button
          id="btn-header-logo"
          onClick={onResetToIntro}
          className="flex items-center text-left group transition-all duration-300 cursor-pointer focus:outline-none"
        >
          <SileoLogo variant="header" />
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1F3A] border border-[#6C2BD9]/50 text-[#FFFFFF] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B7D600] animate-pulse" />
            <span>Test Oficial 45s</span>
          </div>

          <button
            id="btn-toggle-sound"
            onClick={onToggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
            className="p-2.5 sm:px-3 sm:py-2 rounded-xl bg-[#000000]/60 hover:bg-[#0066FF]/20 text-[#FFFFFF] border border-[#0066FF]/30 hover:border-[#0066FF] transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
            title={isMuted ? "Activar audio" : "Silenciar audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-[#FFFFFF]/50" />
                <span className="hidden sm:inline text-[#FFFFFF]/70">Silenciado</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#B7D600]" />
                <span className="hidden sm:inline text-[#FFFFFF]">Audio Activo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
