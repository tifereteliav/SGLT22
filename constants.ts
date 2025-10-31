import { Phase1Item, Phase2Item } from './types';

// Reordered to alternate between 'recommended' and 'avoid'
export const PHASE1_DATA: Phase1Item[] = [
    { id: 'p1_1', text: 'מטופל סוכרתי עם אי ספיקת לב', answer: 'recommended' },
    { id: 'p1_3', text: 'מטופלת עם היסטוריה של זיהומים גניטליים חוזרים', answer: 'avoid' },
    { id: 'p1_2', text: 'מטופל עם EGFR פחות מ60 ומיקרואלבומין בשתן', answer: 'recommended' },
    { id: 'p1_4', text: 'מטופל סוכרתי ששוחרר מאשפוז אחרי DKA', answer: 'avoid' },
    { id: 'p1_5', text: 'מטופלת עם סוכרת הריון', answer: 'avoid' }
];

// Reordered to alternate between correct and incorrect statements
export const PHASE2_DATA: Phase2Item[] = [
    { id: 'p2_1', text: 'יש להקפיד על שתיה בכמות נאותה', isCorrect: true },
    { id: 'p2_6', text: 'יש להפסיק טיפול באינסולין בזמן טיפול ב SGLT2', isCorrect: false },
    { id: 'p2_2', text: 'יש לבצע מעקב לחץ דם', isCorrect: true },
    { id: 'p2_7', text: 'מומלץ לבצע דיאטה קטוגנית בייחוד עם BMI הינו נמוך', isCorrect: false },
    { id: 'p2_3', text: 'יש לעקוב אחרי ערכי סוכר', isCorrect: true },
    { id: 'p2_8', text: 'בזמן מחלת חום הסוכרים עולים ולכן יש להגביר את מינון התרופה', isCorrect: false },
    { id: 'p2_4', text: 'יש להפסיק את הטיפול 3 ימים לפני ניתוח', isCorrect: true },
    { id: 'p2_5', text: 'יש להפסיק את הטיפול בזמן מחלת חום או זיהום משמעותי', isCorrect: true },
];

export const MAX_SCORE = PHASE1_DATA.length + PHASE2_DATA.length;