import React, { useState, useCallback } from 'react';
import { PHASE2_DATA } from '../constants';
import type { Phase2Answers } from '../App';

interface Phase2Props {
    onComplete: (answers: Phase2Answers) => void;
}

const Phase2: React.FC<Phase2Props> = ({ onComplete }) => {
    const [selections, setSelections] = useState<Phase2Answers>({});

    const handleToggle = useCallback((id: string) => {
        setSelections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }, []);

    const handleSubmit = () => {
        // Ensure all items have a boolean value (false if not selected)
        const finalAnswers: Phase2Answers = {};
        PHASE2_DATA.forEach(item => {
            finalAnswers[item.id] = !!selections[item.id];
        });
        onComplete(finalAnswers);
    };

    return (
        <div className="phase-screen animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6 text-center">שלב 2 מתוך 2: הדרכת מטופל</h2>
            <p className="text-gray-600 mb-8 text-center">סמן את כל ההמלצות הנכונות שיש להדריך מטופל המקבל SGLT2. (ייתכן שיותר מתשובה אחת נכונה)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PHASE2_DATA.map(item => (
                    <label key={item.id} className="group flex items-start p-4 rounded-lg border-2 border-gray-200 transition-all duration-200 cursor-pointer hover:shadow-lg hover:border-indigo-300 bg-white has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50">
                        <input 
                            type="checkbox"
                            data-id={item.id}
                            checked={!!selections[item.id]}
                            onChange={() => handleToggle(item.id)}
                            className="sr-only"
                        />
                        <div className="flex-shrink-0 w-6 h-6 mt-1 mr-4 rounded-md border-2 flex items-center justify-center border-gray-300 group-has-[:checked]:bg-teal-500 group-has-[:checked]:border-teal-500 transition-all duration-200">
                           <svg className="w-4 h-4 text-white opacity-0 group-has-[:checked]:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{item.text}</span>
                    </label>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button onClick={handleSubmit} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    סיום וקבלת קוד
                </button>
            </div>
        </div>
    );
};

export default Phase2;