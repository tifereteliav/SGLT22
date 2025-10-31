import React, { useMemo } from 'react';
import { PHASE1_DATA, PHASE2_DATA, MAX_SCORE } from '../constants';
import type { Phase1Answers, Phase2Answers } from '../App';

interface ResultsProps {
    phase1Answers: Phase1Answers;
    phase2Answers: Phase2Answers;
    onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ phase1Answers, phase2Answers, onRestart }) => {

    const secretCode = useMemo(() => {
        let rawScore = 0;

        // Calculate score for phase 1
        PHASE1_DATA.forEach(item => {
            if (phase1Answers[item.id] === item.answer) {
                rawScore++;
            }
        });

        // Calculate score for phase 2
        PHASE2_DATA.forEach(item => {
            if (item.isCorrect === phase2Answers[item.id]) {
                rawScore++;
            }
        });

        const percentage = (rawScore / MAX_SCORE) * 100;
        const roundedPercentage = Math.round(percentage);
        
        if (roundedPercentage >= 90.01) return 'SGLT8888'; // 90-100
        if (roundedPercentage >= 80.01) return 'SGLT7777'; // 80-90
        if (roundedPercentage >= 60.01) return 'SGLT6666'; // 60-80
        if (roundedPercentage >= 40.01) return 'SGLT4444'; // 40-60
        return 'SGLT2222'; // 0-40

    }, [phase1Answers, phase2Answers]);


    return (
        <div className="phase-screen text-center animate-fade-in">
            <h2 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
              האתגר הושלם!
            </h2>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">הקוד הסודי שלך:</h3>
            <div className="bg-indigo-50 border-4 border-indigo-300 p-4 rounded-lg inline-block shadow-inner">
                <p className="text-4xl font-mono text-indigo-800 tracking-widest">{secretCode}</p>
            </div>
            <p className="text-gray-500 mt-2">הזן קוד זה לטופס ההגרלה.</p>

            <div className="mt-10">
                <button onClick={onRestart} className="px-6 py-2 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    התחל מחדש
                </button>
            </div>
        </div>
    );
};

export default Results;