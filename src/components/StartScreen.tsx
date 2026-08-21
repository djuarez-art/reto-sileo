import React from 'react';
import { Play, Timer, Target, Sparkles, Zap, Award, ChevronRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { TOTAL_TIME_SECONDS, TOTAL_CHALLENGES } from '../data/challenges';
import { soundManager } from '../utils/sound';
import { SileoLogo } from './SileoLogo';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center text-center">
      {/* Centered Official SILEO Logo */}
      <div className="mb-6">
        <SileoLogo variant="hero" />
      </div>

      {/* Top Pre-badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F3A] border border-[#6C2BD9]/60 text-[#FFFFFF] text-xs sm:text-sm font-semibold mb-5 shadow-lg shadow-[#6C2BD9]/15">
        <Sparkles className="w-4 h-4 text-[#B7D600] animate-spin" style={{ animationDuration: '6s' }} />
        <span>Gimnasio Cerebral & Agilidad Mental SILEO</span>
      </div>

      {/* Main Title */}
      <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-5xl md:text-6xl text-[#FFFFFF] tracking-tight leading-tight sm:leading-tight mb-4 max-w-3xl">
        ¿Qué tan rápida es <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-[#0066FF] via-[#6C2BD9] to-[#E83E8C] bg-clip-text text-transparent drop-shadow-sm">
          tu mente?
        </span>
      </h1>

      {/* 3 Progressive Difficulty Levels Chip */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000000]/60 border border-[#0066FF]/40 text-xs sm:text-sm text-[#FFFFFF] mb-6 shadow-md">
        <TrendingUp className="w-4 h-4 text-[#B7D600]" />
        <span>3 Niveles Progresivos: <strong className="text-[#B7D600]">Fácil</strong> ➔ <strong className="text-[#0066FF]">Medio</strong> ➔ <strong className="text-[#E83E8C]">Difícil</strong></span>
      </div>

      {/* Subtitle / Objective Description */}
      <p className="text-[#FFFFFF]/90 text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10">
        Pon a prueba tu agudeza visual y velocidad de reacción en menos de{' '}
        <span className="text-[#B7D600] font-bold underline decoration-[#B7D600]/40 decoration-2 underline-offset-4">
          {TOTAL_TIME_SECONDS} segundos
        </span>
        . Supera los 3 niveles de dificultad encontrando la palabra diferente.
      </p>

      {/* Key Metric Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-2xl mb-8 sm:mb-10 text-left">
        {/* Card 1: Time */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#0066FF]/30 hover:border-[#0066FF] transition-all shadow-xl group">
          <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#0066FF]/40 flex items-center justify-center text-[#B7D600] mb-3 group-hover:scale-105 transition-transform">
            <Timer className="w-5 h-5 text-[#B7D600]" />
          </div>
          <div className="font-['Outfit',sans-serif] font-bold text-[#FFFFFF] text-lg">
            {TOTAL_TIME_SECONDS} Segundos
          </div>
          <p className="text-[#FFFFFF]/70 text-xs sm:text-sm mt-1 leading-snug">
            Cronómetro global continuo. Resuelve los 3 niveles antes de que termine.
          </p>
        </div>

        {/* Card 2: 10 Retos en 3 Niveles */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#6C2BD9]/40 hover:border-[#6C2BD9] transition-all shadow-xl group">
          <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#6C2BD9]/40 flex items-center justify-center text-[#0066FF] mb-3 group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5 text-[#0066FF]" />
          </div>
          <div className="font-['Outfit',sans-serif] font-bold text-[#FFFFFF] text-lg">
            10 Retos Visuales
          </div>
          <p className="text-[#FFFFFF]/70 text-xs sm:text-sm mt-1 leading-snug">
            La densidad de distractores y dificultad se elevan automáticamente.
          </p>
        </div>

        {/* Card 3: Diagnóstico */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#E83E8C]/40 hover:border-[#E83E8C] transition-all shadow-xl group">
          <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#E83E8C]/40 flex items-center justify-center text-[#E83E8C] mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5 text-[#E83E8C]" />
          </div>
          <div className="font-['Outfit',sans-serif] font-bold text-[#FFFFFF] text-lg">
            Diagnóstico Preciso
          </div>
          <p className="text-[#FFFFFF]/70 text-xs sm:text-sm mt-1 leading-snug">
            Mensaje según tu puntaje y opción directa de compartir en WhatsApp.
          </p>
        </div>
      </div>

      {/* Main Start CTA Button */}
      <div className="flex flex-col items-center gap-3 w-full max-w-md mb-8">
        <button
          id="btn-start-game"
          onClick={handleStart}
          className="w-full relative group py-4 sm:py-5 px-8 rounded-2xl font-['Outfit',sans-serif] font-black text-xl sm:text-2xl text-[#FFFFFF] bg-gradient-to-r from-[#0066FF] via-[#0052cc] to-[#0066FF] hover:from-[#0055dd] hover:to-[#0077ff] shadow-2xl shadow-[#0066FF]/40 hover:shadow-[#0066FF]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer border-2 border-[#0066FF]/60"
        >
          <div className="w-9 h-9 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#0066FF] group-hover:scale-110 transition-transform shadow-md">
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          </div>
          <span className="tracking-wide">Comenzar Reto</span>
          <ChevronRight className="w-6 h-6 text-[#FFFFFF] group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-xs text-[#FFFFFF]/70 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#B7D600]" />
          Sin registro previo • Evaluación 100% interactiva
        </span>
      </div>

      {/* SILEO Brand Trust & Benefits Banner */}
      <div className="w-full max-w-2xl pt-6 border-t border-[#0066FF]/20 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#FFFFFF]/80">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#B7D600] shrink-0" />
          <span>Lectura Rápida Comprensiva</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
          <span>Ampliación de Campo Visual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0" />
          <span>Neurogimnasia & Concentración</span>
        </div>
      </div>
    </div>
  );
};
