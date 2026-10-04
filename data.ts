import { ELEMENTS_THEORY, EXAM_FORMULA } from './theoryData.ts';
import { PRACTICE_1_QUESTIONS, READING_TEXT_1 } from './practice1Data.ts';
import { PRACTICE_2_QUESTIONS, READING_TEXT_2 } from './practice2Data.ts';
import { QuestionItem } from './types.ts';

export {
  ELEMENTS_THEORY,
  EXAM_FORMULA,
  PRACTICE_1_QUESTIONS,
  READING_TEXT_1,
  PRACTICE_2_QUESTIONS,
  READING_TEXT_2
};

export const ALL_QUESTIONS: QuestionItem[] = [
  ...PRACTICE_1_QUESTIONS,
  ...PRACTICE_2_QUESTIONS
];

export const CATEGORY_LABELS: Record<string, { es: string; hy: string }> = {
  all: { es: 'Todos', hy: 'Բոլորը' },
  emisor: { es: 'Emisor', hy: 'Հաղորդող' },
  receptor: { es: 'Receptor', hy: 'Ընդունող' },
  mensaje: { es: 'Mensaje', hy: 'Հաղորդագրություն' },
  canal: { es: 'Canal', hy: 'Ալիք / Միջոց' },
  código: { es: 'Código', hy: 'Կոդ' },
  contexto: { es: 'Contexto', hy: 'Իրավիճակ' }
};
