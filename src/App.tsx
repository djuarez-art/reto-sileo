import React, { useState } from 'react';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { Footer } from './components/Footer';
import { GameState, GameResult } from './types';
import { soundManager } from './utils/sound';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getIsMuted());

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleFinishGame = (result: GameResult) => {
    setGameResult(result);
    setGameState('completed');
  };

  const handleRestart = () => {
    setGameState('playing');
  };

  const handleResetToIntro = () => {
    setGameState('intro');
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1F3A] text-white relative selection:bg-[#B7D600] selection:text-[#000000]">
      {/* Dynamic Background Ambient Light Gradients matching official Sileo palette */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-[#6C2BD9]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-[#E83E8C]/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#B7D600]/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Header */}
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onResetToIntro={handleResetToIntro}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex items-center justify-center relative z-10 w-full">
        {gameState === 'intro' && (
          <StartScreen onStart={handleStartGame} />
        )}

        {gameState === 'playing' && (
          <GameScreen onFinish={handleFinishGame} />
        )}

        {gameState === 'completed' && gameResult && (
          <ResultsScreen result={gameResult} onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
