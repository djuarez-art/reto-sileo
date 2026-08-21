import React from 'react';
import { Brain, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#0066FF]/20 bg-[#000000] py-6 px-4 text-center text-xs text-[#FFFFFF]/60 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#B7D600]" />
          <span className="font-semibold text-[#FFFFFF]">Reto SILEO</span>
          <span>•</span>
          <span>Evaluación de Agilidad Mental</span>
        </div>

        <div className="flex items-center gap-4 text-[#FFFFFF]/70">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
            Método Neurocognitivo
          </span>
          <span>© {new Date().getFullYear()} SILEO</span>
        </div>
      </div>
    </footer>
  );
};
