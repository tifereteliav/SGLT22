import React from 'react';

interface IntroProps {
    onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
    return (
        <div className="text-center animate-fade-in py-8">
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
                בחן את הידע שלך וקבל החלטות טיפוליות מבוססות ראיות בשני שלבים אינטראקטיביים.
            </p>
            <button
                onClick={onStart}
                className="px-10 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                התחל את האתגר
            </button>
        </div>
    );
};

export default Intro;