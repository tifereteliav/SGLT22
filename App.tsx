import React, { useState, useCallback } from 'react';
import Intro from './components/Intro';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Results from './components/Results';

type Phase = 'intro' | 'phase1' | 'phase2' | 'results';
export type Phase1Answers = Record<string, 'recommended' | 'avoid'>;
export type Phase2Answers = Record<string, boolean>;

const App: React.FC = () => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [phase1Answers, setPhase1Answers] = useState<Phase1Answers | null>(null);
    const [phase2Answers, setPhase2Answers] = useState<Phase2Answers | null>(null);

    const handleStart = useCallback(() => {
        setPhase('phase1');
    }, []);

    const handlePhase1Complete = useCallback((answers: Phase1Answers) => {
        setPhase1Answers(answers);
        setPhase('phase2');
    }, []);

    const handlePhase2Complete = useCallback((answers: Phase2Answers) => {
        setPhase2Answers(answers);
        setPhase('results');
    }, []);

    const handleRestart = useCallback(() => {
        setPhase1Answers(null);
        setPhase2Answers(null);
        setPhase('intro');
    }, []);

    const renderPhase = () => {
        switch (phase) {
            case 'intro':
                return <Intro onStart={handleStart} />;
            case 'phase1':
                return <Phase1 onComplete={handlePhase1Complete} />;
            case 'phase2':
                return <Phase2 onComplete={handlePhase2Complete} />;
            case 'results':
                if (phase1Answers && phase2Answers) {
                    return <Results phase1Answers={phase1Answers} phase2Answers={phase2Answers} onRestart={handleRestart} />;
                }
                // Fallback in case of invalid state
                return <Intro onStart={handleStart} />;
            default:
                return <Intro onStart={handleStart} />;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="p-1 rounded-2xl bg-gradient-to-br from-teal-400 via-indigo-500 to-pink-500 shadow-2xl shadow-indigo-200/70">
                <div className="w-full max-w-4xl bg-white rounded-xl p-6 sm:p-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 text-center mb-6 border-b-2 pb-2 border-indigo-200">
                        אתגר מקצועי: החלטות טיפוליות ב-SGLT2
                    </h1>
                    {renderPhase()}
                </div>
            </div>
        </div>
    );
};

export default App;