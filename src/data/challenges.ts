import { Challenge, DiagnosticTier } from '../types';

export const TOTAL_TIME_SECONDS = 45;
export const TOTAL_CHALLENGES = 10;

export interface DifficultyLevelInfo {
  levelNumber: 1 | 2 | 3;
  name: 'Fácil' | 'Medio' | 'Difícil';
  badgeColor: string;
  description: string;
  rangeText: string;
}

export const DIFFICULTY_LEVELS: Record<number, DifficultyLevelInfo> = {
  1: {
    levelNumber: 1,
    name: 'Fácil',
    badgeColor: 'bg-[#0B1F3A] text-[#B7D600] border-[#B7D600]/40',
    description: 'Calentamiento visual y discriminación básica',
    rangeText: 'Retos 1 a 3'
  },
  2: {
    levelNumber: 2,
    name: 'Medio',
    badgeColor: 'bg-[#0B1F3A] text-[#0066FF] border-[#0066FF]/50',
    description: 'Transposición de grafías y rastreo ocular',
    rangeText: 'Retos 4 a 7'
  },
  3: {
    levelNumber: 3,
    name: 'Difícil',
    badgeColor: 'bg-[#0B1F3A] text-[#E83E8C] border-[#E83E8C]/50',
    description: 'Filtro neuronal de alta densidad y campo periférico',
    rangeText: 'Retos 8 a 10'
  }
};

export const CHALLENGES: Challenge[] = [
  // --- NIVEL 1: FÁCIL (Retos 1 a 3) ---
  {
    id: 1,
    title: "Reto 1: Reconocimiento Rápido",
    targetWord: "MENTE",
    distractorWord: "MONTE",
    gridSize: 16,
    category: "Agudeza Visual",
    difficulty: "fácil",
    levelNumber: 1,
    description: "Encuentra 'MENTE' entre 'MONTE'"
  },
  {
    id: 2,
    title: "Reto 2: Percepción SILEO",
    targetWord: "SILEO",
    distractorWord: "SILOE",
    gridSize: 16,
    category: "Inversión de Grafías",
    difficulty: "fácil",
    levelNumber: 1,
    description: "Encuentra 'SILEO' entre 'SILOE'"
  },
  {
    id: 3,
    title: "Reto 3: Discriminación de Letra Inicial",
    targetWord: "FOCO",
    distractorWord: "POCO",
    gridSize: 16,
    category: "Discriminación Fonética",
    difficulty: "fácil",
    levelNumber: 1,
    description: "Encuentra 'FOCO' entre 'POCO'"
  },

  // --- NIVEL 2: MEDIO (Retos 4 a 7) ---
  {
    id: 4,
    title: "Reto 4: Transposición de Vocales",
    targetWord: "ENFOQUE",
    distractorWord: "ENFOQEU",
    gridSize: 24,
    category: "Transposición de Grafías",
    difficulty: "medio",
    levelNumber: 2,
    description: "Encuentra 'ENFOQUE' entre 'ENFOQEU'"
  },
  {
    id: 5,
    title: "Reto 5: Agilidad de Salto Visual",
    targetWord: "RÁPIDO",
    distractorWord: "RÁDIPO",
    gridSize: 24,
    category: "Rastreo Visual Dinámico",
    difficulty: "medio",
    levelNumber: 2,
    description: "Encuentra 'RÁPIDO' entre 'RÁDIPO'"
  },
  {
    id: 6,
    title: "Reto 6: Coordinación Perceptiva",
    targetWord: "AGILIDAD",
    distractorWord: "AGILDIAD",
    gridSize: 24,
    category: "Fijación y Salto Ocular",
    difficulty: "medio",
    levelNumber: 2,
    description: "Encuentra 'AGILIDAD' entre 'AGILDIAD'"
  },
  {
    id: 7,
    title: "Reto 7: Filtro Neuronal",
    targetWord: "CEREBRO",
    distractorWord: "CEBERRO",
    gridSize: 24,
    category: "Procesamiento Semántico",
    difficulty: "medio",
    levelNumber: 2,
    description: "Encuentra 'CEREBRO' entre 'CEBERRO'"
  },

  // --- NIVEL 3: DIFÍCIL (Retos 8 a 10) ---
  {
    id: 8,
    title: "Reto 8: Ampliación de Campo Periférico",
    targetWord: "LECTURA",
    distractorWord: "LETGURA",
    gridSize: 30,
    category: "Lectura Periférica Rápida",
    difficulty: "difícil",
    levelNumber: 3,
    description: "Encuentra 'LECTURA' entre 'LETGURA'"
  },
  {
    id: 9,
    title: "Reto 9: Máxima Concentración",
    targetWord: "ATENCIÓN",
    distractorWord: "ATENICÓN",
    gridSize: 30,
    category: "Atención Focalizada",
    difficulty: "difícil",
    levelNumber: 3,
    description: "Encuentra 'ATENCIÓN' entre 'ATENICÓN'"
  },
  {
    id: 10,
    title: "Reto 10: Desafío Maestro de Velocidad",
    targetWord: "VELOCIDAD",
    distractorWord: "VELOCDIAD",
    gridSize: 36,
    category: "Velocidad de Procesamiento Extrema",
    difficulty: "difícil",
    levelNumber: 3,
    description: "Encuentra 'VELOCIDAD' entre 'VELOCDIAD'"
  }
];

export function getDiagnosticTier(score: number): DiagnosticTier {
  if (score === 10) {
    return {
      title: "Mente supersónica",
      subtitle: "Puntaje Perfecto (10 de 10)",
      badge: "10 de 10 • Nivel Maestro ⚡",
      badgeColor: "from-[#B7D600] to-[#0066FF] text-[#000000]",
      percentile: "Top 1% de agilidad mental",
      motivationalMessage: "¡Impresionante! Has alcanzado la puntuación máxima resolviendo los 3 niveles de dificultad antes de agotarse el tiempo. Tu velocidad de procesamiento y discriminación visual están al máximo nivel.",
      recommendation: "Con tu capacidad neuronal actual, un método de lectura de alta velocidad te permitirá procesar más de 1,200 palabras por minuto con retención total.",
      sileoTip: "Tu cerebro tiene una velocidad de sinapsis ideal para asimilar libros enteros en menos de una hora."
    };
  } else if (score >= 7) {
    // 7 a 9
    return {
      title: "Muy ágil",
      subtitle: "Rendimiento Sobresaliente (7 a 9 de 10)",
      badge: `${score} de 10 • Nivel Avanzado 🔥`,
      badgeColor: "from-[#0066FF] to-[#6C2BD9] text-white",
      percentile: "Superas al 85% de las personas evaluadas",
      motivationalMessage: "¡Excelente desempeño! Demostraste gran rapidez visual y superaste con soltura los niveles fácil y medio, llegando a los retos de alta densidad.",
      recommendation: "Ampliando tu campo visual periférico y eliminando la subvocalización puedes duplicar o triplicar tu velocidad de estudio y lectura profesional.",
      sileoTip: "Con técnicas de neurogimnasia SILEO podrás escanear textos densos en segundos sin perder concentración."
    };
  } else if (score >= 4) {
    // 4 a 6
    return {
      title: "Buen ritmo, sigue practicando",
      subtitle: "Potencial en Crecimiento (4 a 6 de 10)",
      badge: `${score} de 10 • Nivel Intermedio 💡`,
      badgeColor: "from-[#6C2BD9] to-[#0066FF] text-white",
      percentile: "Rango promedio activo (Percentil 55%)",
      motivationalMessage: "¡Buen esfuerzo! Lograste resolver con éxito varios retos. Al subir la dificultad a los niveles medio y difícil, la densidad de distractores redujo tu velocidad de barrido ocular.",
      recommendation: "Entrenar los músculos oculares y la visión panorámica te permitirá identificar patrones al instante sin cansancio visual.",
      sileoTip: "El método SILEO entrena tu visión periférica para captar bloques completos de información de un solo vistazo."
    };
  } else {
    // 0 a 3
    return {
      title: "Su mente puede entrenarse mucho más, inténtelo de nuevo",
      subtitle: "Oportunidad de Desarrollo (0 a 3 de 10)",
      badge: `${score} de 10 • Oportunidad de Entrenamiento 🌱`,
      badgeColor: "from-[#E83E8C] to-[#6C2BD9] text-white",
      percentile: "Etapa de activación inicial",
      motivationalMessage: "¡Has dado el primer paso! La presión del reloj y la similitud de las palabras exigieron verificación letra por letra. Esto ocurre cuando no se ha ejercitado el salto visual fotográfico.",
      recommendation: "El cerebro es 100% plástico: con los ejercicios guiados correctos de gimnasia cerebral y lectura veloz multiplicarás tu agilidad mental desde las primeras sesiones.",
      sileoTip: "¡No te desanimes! Con el entrenamiento de SILEO puedes aumentar hasta 5 veces tu velocidad de lectura y agilidad mental."
    };
  }
}
