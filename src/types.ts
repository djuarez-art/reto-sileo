export interface Challenge {
  id: number;
  title: string;
  targetWord: string;
  distractorWord: string;
  gridSize: number; // total number of words in the grid (e.g., 16, 24, 30, 36)
  category: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
  levelNumber: 1 | 2 | 3;
  description?: string;
}

export interface GameResult {
  score: number;
  totalChallenges: number;
  timeLeft: number;
  timeSpent: number;
  completed: boolean;
  accuracy: number;
  avgTimePerChallenge: number;
  tier: DiagnosticTier;
}

export interface DiagnosticTier {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  percentile: string;
  motivationalMessage: string;
  recommendation: string;
  sileoTip: string;
}

export type GameState = 'intro' | 'playing' | 'completed' | 'timeout';
