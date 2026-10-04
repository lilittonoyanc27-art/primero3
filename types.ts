export type PracticeBlockId = 1 | 2;

export interface ElementDefinition {
  id: string;
  nameEs: string;
  nameHy: string;
  descEs: string;
  descHy: string;
  exampleEs: string;
  exampleHy: string;
  roleHint: string;
}

export interface BreakdownItem {
  labelEs: string;
  labelHy: string;
  answerEs: string;
  answerHy?: string;
}

export interface QuestionItem {
  id: string;
  block: PracticeBlockId;
  partNumber: number;
  partTitleEs: string;
  partTitleHy: string;
  partSubtitle?: string;
  number: number;
  scenarioEs?: string;
  scenarioHy?: string;
  questionEs: string;
  questionHy: string;
  type: 'mcq' | 'breakdown' | 'error_detection' | 'open' | 'comparison' | 'dialogue';
  options?: { key: string; textEs: string; textHy?: string }[];
  correctKey?: string;
  breakdown?: BreakdownItem[];
  officialAnswerEs: string;
  officialAnswerHy?: string;
  explanationEs?: string;
  explanationHy?: string;
  highlightCategory?: 'emisor' | 'receptor' | 'mensaje' | 'canal' | 'código' | 'contexto' | 'general';
}

export interface ReadingText {
  id: string;
  block: PracticeBlockId;
  partNumber: number;
  titleEs: string;
  titleHy: string;
  passageEs: string;
  passageHy: string;
}
