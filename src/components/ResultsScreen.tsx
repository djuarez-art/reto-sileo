import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Timer, 
  Share2, 
  MessageCircle, 
  RotateCcw, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  Flame, 
  Brain,
  Lightbulb,
  Award
} from 'lucide-react';
import { GameResult } from '../types';
import { soundManager } from '../utils/sound';
import { SileoLogo } from './SileoLogo';

interface ResultsScreenProps {
  result: GameResult;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestart }) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Trigger confetti burst on high scores (7+)
  useEffect(() => {
    if (result.score >= 7) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0066FF', '#6C2BD9', '#E83E8C', '#B7D600', '#FFFFFF']
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [result.score]);

  // WhatsApp Link 1: Retar a un amigo
  const handleChallengeFriendWhatsApp = () => {
    soundManager.playClick();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sileo.com.mx';
    const text = `🧠⚡ *¡RETO DE AGILIDAD MENTAL SILEO!*\n\nAcabo de obtener *${result.score}/10 aciertos* (${result.tier.title}) en 45 segundos en el Reto SILEO.\n\n¿Crees que tu mente es más rápida que la mía? 😏 Acepta el reto aquí:\n👉 ${currentUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // WhatsApp Link 2: Agendar diagnóstico gratuito con SILEO (+52 55 21 89 32 97)
  const handleGetDiagnosticWhatsApp = () => {
    soundManager.playClick();
    const phoneNumber = '525521893297';
    const text = '¡Hola! 👋 Acabo de realizar el Reto SILEO 🧠 y quiero conocer más sobre mi potencial. Me interesa agendar mi diagnóstico gratuito.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy Link Fallback
  const handleCopyLink = () => {
    soundManager.playClick();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sileo.com.mx';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
      {/* Official Sileo Logo on Results Screen */}
      <SileoLogo variant="results" className="mb-2" />

      {/* Top Victory / Evaluation Badge */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1F3A] border border-[#6C2BD9]/60 text-[#B7D600] text-xs sm:text-sm font-bold mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-[#B7D600]" />
          <span>{result.tier.badge}</span>
        </div>

        {/* Main Required Result Title */}
        <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-4xl md:text-5xl text-[#FFFFFF] tracking-tight leading-tight max-w-2xl mx-auto">
          {result.tier.title}
        </h1>
        <p className="text-[#FFFFFF]/90 text-sm sm:text-base max-w-xl mx-auto mt-2">
          {result.tier.subtitle} • <span className="text-[#B7D600] font-bold">{result.tier.percentile}</span>
        </p>
      </div>

      {/* Main Scoreboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mb-6">
        {/* Puntuación */}
        <div className="p-4 rounded-2xl bg-[#0B1F3A] border border-[#0066FF]/30 flex flex-col items-center text-center shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-[#000000] border border-[#0066FF]/40 flex items-center justify-center text-[#B7D600] mb-2 shadow-sm">
            <Trophy className="w-4 h-4" />
          </div>
          <span className="text-xs text-[#FFFFFF]/70 font-medium">Puntuación</span>
          <div className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-[#FFFFFF] mt-0.5">
            <span className="text-[#B7D600]">{result.score}</span>
            <span className="text-[#FFFFFF]/50 text-base sm:text-lg">/{result.totalChallenges}</span>
          </div>
          <span className="text-[10px] text-[#B7D600] mt-1 font-semibold">
            {result.accuracy}% de Aciertos
          </span>
        </div>

        {/* Tiempo Restante */}
        <div className="p-4 rounded-2xl bg-[#0B1F3A] border border-[#6C2BD9]/40 flex flex-col items-center text-center shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-[#000000] border border-[#6C2BD9]/40 flex items-center justify-center text-[#0066FF] mb-2 shadow-sm">
            <Timer className="w-4 h-4" />
          </div>
          <span className="text-xs text-[#FFFFFF]/70 font-medium">Tiempo Restante</span>
          <div className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-[#FFFFFF] mt-0.5">
            <span className={result.timeLeft > 0 ? 'text-[#B7D600]' : 'text-[#FFFFFF]/50'}>
              {result.timeLeft}s
            </span>
          </div>
          <span className="text-[10px] text-[#FFFFFF]/70 mt-1">
            {result.timeSpent}s empleados
          </span>
        </div>

        {/* Velocidad Promedio */}
        <div className="p-4 rounded-2xl bg-[#0B1F3A] border border-[#E83E8C]/40 flex flex-col items-center text-center shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-[#000000] border border-[#E83E8C]/40 flex items-center justify-center text-[#E83E8C] mb-2 shadow-sm">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xs text-[#FFFFFF]/70 font-medium">Velocidad</span>
          <div className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl text-[#FFFFFF] mt-0.5">
            {result.avgTimePerChallenge > 0 ? `${result.avgTimePerChallenge}s` : '--'}
          </div>
          <span className="text-[10px] text-[#FFFFFF]/70 mt-1">
            por reto visual
          </span>
        </div>

        {/* Dificultad Superada */}
        <div className="p-4 rounded-2xl bg-[#0B1F3A] border border-[#0066FF]/30 flex flex-col items-center text-center shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-[#000000] border border-[#0066FF]/40 flex items-center justify-center text-[#0066FF] mb-2 shadow-sm">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xs text-[#FFFFFF]/70 font-medium">Nivel Alcanzado</span>
          <div className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl text-[#0066FF] mt-0.5 capitalize">
            {result.score >= 8 ? 'Difícil' : result.score >= 4 ? 'Medio' : 'Fácil'}
          </div>
          <span className="text-[10px] text-[#B7D600] mt-1 font-semibold">
            {result.score === 10 ? '¡3 Niveles Completos!' : 'Fácil ➔ Medio ➔ Difícil'}
          </span>
        </div>
      </div>

      {/* Motivational & Diagnostic Feedback Box */}
      <div className="w-full bg-[#0B1F3A] border border-[#6C2BD9]/50 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#6C2BD9]/40 flex items-center justify-center text-[#B7D600] shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-left">
            <h3 className="font-['Outfit',sans-serif] font-bold text-[#FFFFFF] text-base sm:text-lg flex items-center gap-2">
              <span>Evaluación de Rendimiento Mental</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#6C2BD9]/30 text-[#FFFFFF] border border-[#6C2BD9]/60">
                Oficial SILEO
              </span>
            </h3>
            <p className="text-[#FFFFFF]/90 text-xs sm:text-sm leading-relaxed">
              {result.tier.motivationalMessage}
            </p>
            <div className="pt-2 border-t border-[#0066FF]/20 mt-2">
              <p className="text-[#B7D600] text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#E83E8C] shrink-0" />
                <span><strong className="text-[#FFFFFF]">Tip Neurocognitivo:</strong> {result.tier.sileoTip}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SILEO Connection Callout Card with Prominent WhatsApp Call-to-Action */}
      <div className="w-full max-w-xl bg-[#0B1F3A] border-2 border-[#0066FF] rounded-2xl p-5 sm:p-6 mb-6 shadow-2xl shadow-[#0066FF]/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C2BD9]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E83E8C]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C2BD9]/30 border border-[#6C2BD9]/50 text-[#B7D600] text-xs font-bold mb-3 uppercase tracking-wider">
          <Brain className="w-3.5 h-3.5 text-[#B7D600]" />
          <span>Neuroentrenamiento SILEO</span>
        </div>

        {/* Exact text requested by user */}
        <p className="font-['Outfit',sans-serif] font-bold text-[#FFFFFF] text-base sm:text-lg md:text-xl leading-snug mb-4">
          “Esto es solo una muestra de lo que tu mente puede hacer. Con el entrenamiento adecuado, puedes desarrollar aún más tu atención, velocidad de procesamiento y agilidad mental.”
        </p>

        {/* Direct WhatsApp CTA Button with this specific call */}
        <button
          id="btn-whatsapp-sileo-connection"
          onClick={handleGetDiagnosticWhatsApp}
          className="w-full py-4 px-6 rounded-xl font-['Outfit',sans-serif] font-black text-base sm:text-lg text-[#FFFFFF] bg-gradient-to-r from-[#0066FF] via-[#0052cc] to-[#0066FF] hover:from-[#0055dd] hover:to-[#0077ff] shadow-2xl shadow-[#0066FF]/40 hover:shadow-[#0066FF]/60 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-3 cursor-pointer border-2 border-[#0066FF]/70"
        >
          <MessageCircle className="w-6 h-6 shrink-0 fill-[#FFFFFF] text-[#0066FF]" />
          <span>Agendar Diagnóstico Gratuito por WhatsApp</span>
        </button>
      </div>

      {/* WhatsApp Primary Action Buttons */}
      <div className="w-full max-w-xl flex flex-col gap-3.5 mb-6">
        {/* Button 1: Retar a un amigo por WhatsApp */}
        <button
          id="btn-whatsapp-challenge"
          onClick={handleChallengeFriendWhatsApp}
          className="w-full py-3.5 px-6 rounded-2xl font-['Outfit',sans-serif] font-bold text-base text-[#FFFFFF] bg-gradient-to-r from-[#6C2BD9] via-[#5b22bb] to-[#6C2BD9] hover:from-[#7c3aed] hover:to-[#6C2BD9] shadow-xl shadow-[#6C2BD9]/30 hover:shadow-[#6C2BD9]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer border border-[#6C2BD9]/70"
        >
          <Share2 className="w-5 h-5 shrink-0" />
          <span>Retar a un amigo por WhatsApp</span>
        </button>

        {/* Secondary Utility Controls */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Replay */}
          <button
            id="btn-restart-game"
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="py-3 px-4 rounded-xl bg-[#000000]/70 hover:bg-[#0066FF]/20 border border-[#0066FF]/30 hover:border-[#0066FF] text-[#FFFFFF] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#0066FF]" />
            <span>Volver a Intentar</span>
          </button>

          {/* Copy Link */}
          <button
            id="btn-copy-link"
            onClick={handleCopyLink}
            className="py-3 px-4 rounded-xl bg-[#000000]/70 hover:bg-[#0066FF]/20 border border-[#0066FF]/30 hover:border-[#0066FF] text-[#FFFFFF] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#B7D600]" />
                <span className="text-[#B7D600]">¡Enlace Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#E83E8C]" />
                <span>Copiar Enlace</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SILEO Training Info Footnote */}
      <div className="w-full max-w-xl p-4 rounded-xl bg-[#000000]/60 border border-[#0066FF]/20 text-center text-xs text-[#FFFFFF]/70">
        <p className="leading-relaxed">
          💡 <strong className="text-[#FFFFFF]">¿Sabías que el cerebro se puede entrenar?</strong> En SILEO desarrollamos métodos comprobados de lectura veloz y sinapsis acelerada para estudiantes y profesionistas.
        </p>
      </div>
    </div>
  );
};
