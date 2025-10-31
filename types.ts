
export interface Phase1Item {
  id: string;
  text: string;
  answer: 'recommended' | 'avoid';
}

export interface Phase2Item {
  id: string;
  text: string;
  isCorrect: boolean;
}
