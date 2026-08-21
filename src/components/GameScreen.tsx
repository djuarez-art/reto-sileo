import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Timer, CheckCircle, Zap, AlertCircle, ArrowRight, TrendingUp, Sparkles, Flame, Brain } from 'lucide-react';
import { Challenge, GameResult } from '../types';
import { CHALLENGES, TOTAL_TIME_SECONDS, TOTAL_CHALLENGES, getDiagnosticTier, DIFFICULTY_LEVELS } from '../data/challenges';
import { soundManager } from '../utils/sound';

interface GameScreenProps {
  onFinish: (result: GameResult) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME_SECONDS);
  const [wrongClickedIndex, setWrongClickedIndex] = useState<number | null>(null);
  const [correctClickedIndex, setCorrectClickedIndex] = useState<number | null>(null);
  const [shake, setShake] = useState<boolean>(false);
  const [levelUpToast, setLevelUpToast] = useState<{ show: boolean; levelName: string; levelNum: number } | null>(null);

  const currentChallenge: Challenge = CHALLENGES[currentIdx] || CHALLENGES[0];
  const currentLevelInfo = DIFFICULTY_LEVELS[currentChallenge.levelNumber];

  // Generate randomized grid for current challenge
  const gridItems = useMemo(() => {
    const size = currentChallenge.gridSize;
    const targetPos = Math.floor(Math.random() * size);
    const items: Array<{ id: number; word: string; isTarget: boolean }> = [];

    for (let i = 0; i < size; i++) {
      if (i === targetPos) {
        items.push({
          id: i,
          word: currentChallenge.targetWord,
          isTarget: true
        });
      } else {
        items.push({
          id: i,
          word: currentChallenge.distractorWord,
          isTarget: false
        });
      }
    }
    return items;
  }, [currentChallenge]);

  // Handle Game Completion
  const finishGame = useCallback((finalScore: number, finalTimeLeft: number, completedAll: boolean) => {
    const timeSpent = TOTAL_TIME_SECONDS - Math.max(0, finalTimeLeft);
    const accuracy = Math.round((finalScore / TOTAL_CHALLENGES) * 100);
    const avgTime = finalScore > 0 ? Number((timeSpent / finalScore).toFixed(1)) : 0;
    const tier = getDiagnosticTier(finalScore);

    if (finalScore >= 7) {
      soundManager.playVictory();
    }

    onFinish({
      score: finalScore,
      totalChallenges: TOTAL_CHALLENGES,
      timeLeft: finalTimeLeft,
      timeSpent,
      completed: completedAll,
      accuracy,
      avgTimePerChallenge: avgTime,
      tier
    });
  }, [onFinish]);

  // Main 45s Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame(score, 0, false);
          return 0;
        }

        // Ticking audio in last 5 seconds
        if (prev <= 6 && prev > 1) {
          soundManager.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, finishGame]);

  // Check for level transitions (Easy -> Medium at index 3/challenge 4, Medium -> Hard at index 7/challenge 8)
  const advanceToNextChallenge = useCallback((nextIdx: number) => {
    if (nextIdx < CHALLENGES.length) {
      const currentLevel = CHALLENGES[currentIdx]?.levelNumber;
      const nextLevel = CHALLENGES[nextIdx]?.levelNumber;

      if (nextLevel && currentLevel && nextLevel > currentLevel) {
        const nextLevelInfo = DIFFICULTY_LEVELS[nextLevel];
        setLevelUpToast({
          show: true,
          levelName: nextLevelInfo.name,
          levelNum: nextLevelInfo.levelNumber
        });
        setTimeout(() => {
          setLevelUpToast(null);
        }, 1800);
      }
      setCurrentIdx(nextIdx);
    } else {
      // Completed all 10 challenges!
      finishGame(score + 1, timeLeft, true);
    }
  }, [currentIdx, finishGame, score, timeLeft]);

  // Handle word selection
  const handleSelectWord = (item: { id: number; word: string; isTarget: boolean }, index: number) => {
    if (correctClickedIndex !== null) return; // Prevent double clicks during transition

    if (item.isTarget) {
      // Correct!
      soundManager.playCorrect();
      setCorrectClickedIndex(index);
      const newScore = score + 1;
      setScore(newScore);

      setTimeout(() => {
        setCorrectClickedIndex(null);
        setWrongClickedIndex(null);

        if (currentIdx + 1 < CHALLENGES.length) {
          advanceToNextChallenge(currentIdx + 1);
        } else {
          finishGame(newScore, timeLeft, true);
        }
      }, 320);
    } else {
      // Incorrect!
      soundManager.playWrong();
      setWrongClickedIndex(index);
      setShake(true);

      setTimeout(() => {
        setWrongClickedIndex(null);
        setShake(false);
      }, 450);
    }
  };

  // Allow skip if stuck
  const handleSkip = () => {
    soundManager.playClick();
    if (currentIdx + 1 < CHALLENGES.length) {
      advanceToNextChallenge(currentIdx + 1);
    } else {
      finishGame(score, timeLeft, true);
    }
  };

  // Timer Color & Progress Math
  const isUrgent = timeLeft <= 10;
  const timerPercentage = (timeLeft / TOTAL_TIME_SECONDS) * 100;
  const progressPercentage = ((currentIdx + 1) / TOTAL_CHALLENGES) * 100;

  // Grid columns class based on grid size
  const getGridColsClass = (size: number) => {
    if (size <= 16) return 'grid-cols-4';
    if (size <= 24) return 'grid-cols-4 sm:grid-cols-6';
    if (size <= 30) return 'grid-cols-5 sm:grid-cols-6';
    return 'grid-cols-4 sm:grid-cols-6';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center relative">
      {/* Level-Up Overlay Toast */}
      {levelUpToast && (
        <div className="fixed top-24 z-50 animate-bounce pointer-events-none">
          <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#0066FF] via-[#6C2BD9] to-[#E83E8C] text-[#FFFFFF] font-['Outfit',sans-serif] font-black text-sm sm:text-base shadow-2xl shadow-[#6C2BD9]/50 flex items-center gap-2 border border-[#FFFFFF]/40">
            <Sparkles className="w-5 h-5 text-[#B7D600]" />
            <span>¡Nivel {levelUpToast.levelNum}: {levelUpToast.levelName.toUpperCase()} desbloqueado!</span>
          </div>
        </div>
      )}

      {/* 3-Level Progressive Step Indicator */}
      <div className="w-full grid grid-cols-3 gap-2 mb-3">
        {/* Nivel 1: Fácil */}
        <div className={`p-2 rounded-xl border text-center transition-all ${
          currentChallenge.levelNumber === 1
            ? 'bg-[#0B1F3A] border-[#B7D600] text-[#B7D600] shadow-md shadow-[#B7D600]/20 ring-1 ring-[#B7D600]/50'
            : currentChallenge.levelNumber > 1
            ? 'bg-[#000000]/40 border-[#0066FF]/20 text-[#FFFFFF]/50'
            : 'bg-[#000000]/30 border-[#0066FF]/10 text-[#FFFFFF]/40'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold font-['Outfit',sans-serif]">
            <span>1. Fácil</span>
            {currentChallenge.levelNumber > 1 && <CheckCircle className="w-3 h-3 text-[#B7D600] inline" />}
          </div>
          <span className="text-[9px] sm:text-[10px] block text-[#FFFFFF]/70 font-medium">Retos 1 - 3</span>
        </div>

        {/* Nivel 2: Medio */}
        <div className={`p-2 rounded-xl border text-center transition-all ${
          currentChallenge.levelNumber === 2
            ? 'bg-[#0B1F3A] border-[#0066FF] text-[#0066FF] shadow-md shadow-[#0066FF]/30 ring-1 ring-[#0066FF]/50'
            : currentChallenge.levelNumber > 2
            ? 'bg-[#000000]/40 border-[#0066FF]/20 text-[#FFFFFF]/50'
            : 'bg-[#000000]/30 border-[#0066FF]/10 text-[#FFFFFF]/40'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold font-['Outfit',sans-serif]">
            <span>2. Medio</span>
            {currentChallenge.levelNumber > 2 && <CheckCircle className="w-3 h-3 text-[#0066FF] inline" />}
          </div>
          <span className="text-[9px] sm:text-[10px] block text-[#FFFFFF]/70 font-medium">Retos 4 - 7</span>
        </div>

        {/* Nivel 3: Difícil */}
        <div className={`p-2 rounded-xl border text-center transition-all ${
          currentChallenge.levelNumber === 3
            ? 'bg-[#0B1F3A] border-[#E83E8C] text-[#E83E8C] shadow-md shadow-[#E83E8C]/30 ring-1 ring-[#E83E8C]/50 animate-pulse'
            : 'bg-[#000000]/30 border-[#0066FF]/10 text-[#FFFFFF]/40'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold font-['Outfit',sans-serif]">
            <Flame className={`w-3 h-3 ${currentChallenge.levelNumber === 3 ? 'text-[#E83E8C]' : 'text-[#FFFFFF]/40'}`} />
            <span>3. Difícil</span>
          </div>
          <span className="text-[9px] sm:text-[10px] block text-[#FFFFFF]/70 font-medium">Retos 8 - 10</span>
        </div>
      </div>

      {/* Top HUD Bar */}
      <div className="w-full bg-[#0B1F3A]/90 border border-[#0066FF]/30 rounded-2xl p-3.5 sm:p-4 mb-4 sm:mb-5 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          {/* Progress Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#000000] border border-[#0066FF]/50 flex items-center justify-center font-['Outfit',sans-serif] font-bold text-[#B7D600] text-sm sm:text-base shadow-sm">
              {currentIdx + 1}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF] uppercase tracking-wider">
                  Reto {currentIdx + 1} de {TOTAL_CHALLENGES}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${currentLevelInfo.badgeColor}`}>
                  Nivel {currentChallenge.levelNumber}: {currentLevelInfo.name}
                </span>
              </div>
              <p className="text-[11px] text-[#FFFFFF]/70">
                {currentChallenge.category}
              </p>
            </div>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#000000] border border-[#0066FF]/30 text-[#FFFFFF]">
            <CheckCircle className="w-4 h-4 text-[#B7D600]" />
            <span className="text-xs sm:text-sm font-semibold">Aciertos:</span>
            <span className="text-sm sm:text-base font-black text-[#B7D600] font-['Outfit',sans-serif]">
              {score}
            </span>
          </div>

          {/* Circular Countdown Timer */}
          <div className="flex items-center gap-2">
            <div className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full ${isUrgent ? 'animate-pulse' : ''}`}>
              {/* SVG Ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="transparent"
                  className="stroke-[#000000]/60"
                  strokeWidth="3.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="transparent"
                  stroke={isUrgent ? '#E83E8C' : '#B7D600'}
                  strokeWidth="3.5"
                  strokeDasharray={113}
                  strokeDashoffset={113 - (113 * timerPercentage) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span
                  className={`font-['Outfit',sans-serif] font-black text-sm sm:text-base leading-none ${
                    isUrgent ? 'text-[#E83E8C] font-bold' : 'text-[#FFFFFF]'
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-[#000000] h-1.5 rounded-full mt-3 overflow-hidden border border-[#0066FF]/20">
          <div
            className="bg-gradient-to-r from-[#0066FF] via-[#6C2BD9] via-[#E83E8C] to-[#B7D600] h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Challenge Instruction Card */}
      <div className="w-full bg-[#0B1F3A] border border-[#0066FF]/30 rounded-2xl p-4 sm:p-5 mb-4 text-center shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#0066FF]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C2BD9]/30 border border-[#6C2BD9]/50 text-[#FFFFFF] text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5 text-[#B7D600]" />
          <span>Atención Visual Focalizada</span>
        </div>

        <h2 className="font-['Outfit',sans-serif] font-bold text-lg sm:text-2xl text-[#FFFFFF]">
          Encuentra la palabra diferente:
        </h2>
        <p className="text-[#FFFFFF]/90 text-xs sm:text-sm mt-1">
          Busca <span className="text-[#B7D600] font-bold px-2.5 py-0.5 rounded bg-[#000000] border border-[#B7D600]/40 shadow-inner">
            {currentChallenge.targetWord}
          </span> entre las palabras repetidas
        </p>
      </div>

      {/* Interactive Word Grid */}
      <div
        className={`w-full grid ${getGridColsClass(currentChallenge.gridSize)} gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-2xl bg-[#000000] border border-[#0066FF]/30 shadow-2xl mb-4 transition-transform ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {gridItems.map((item, idx) => {
          const isCorrect = correctClickedIndex === idx;
          const isWrong = wrongClickedIndex === idx;

          return (
            <button
              key={`${currentIdx}-${item.id}`}
              id={`word-card-${idx}`}
              onClick={() => handleSelectWord(item, idx)}
              className={`py-2.5 sm:py-3.5 px-1 sm:px-2 rounded-xl font-['Outfit',sans-serif] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 cursor-pointer select-none border text-center flex items-center justify-center ${
                isCorrect
                  ? 'bg-[#B7D600] text-[#000000] border-[#B7D600] shadow-lg shadow-[#B7D600]/50 scale-105 z-10 font-black'
                  : isWrong
                  ? 'bg-[#E83E8C]/20 text-[#FFFFFF] border-[#E83E8C] shadow-lg shadow-[#E83E8C]/40 animate-pulse'
                  : 'bg-[#0B1F3A] text-[#FFFFFF] hover:text-[#FFFFFF] border-[#0066FF]/30 hover:border-[#B7D600] hover:bg-[#0066FF]/40 hover:scale-[1.03] active:scale-95 shadow-sm'
              }`}
            >
              {item.word}
            </button>
          );
        })}
      </div>

      {/* Bottom Hint / Skip Controls */}
      <div className="w-full flex items-center justify-between text-xs text-[#FFFFFF]/70 px-2">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-[#0066FF]" />
          Toca la palabra diferente para avanzar
        </span>

        <button
          id="btn-skip-challenge"
          onClick={handleSkip}
          className="flex items-center gap-1 text-[#FFFFFF]/70 hover:text-[#B7D600] font-medium transition-colors p-1 rounded cursor-pointer"
        >
          <span>Saltar reto</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
