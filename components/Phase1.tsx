import React, { useState, useCallback } from 'react';
import { PHASE1_DATA } from '../constants';
import { Phase1Item } from '../types';
import type { Phase1Answers } from '../App';

interface Phase1Props {
    onComplete: (answers: Phase1Answers) => void;
}

const DraggableItem: React.FC<{ item: Phase1Item }> = ({ item }) => (
    <div
        id={item.id}
        data-id={item.id}
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', item.id);
            (e.target as HTMLDivElement).classList.add('opacity-70', 'scale-105', 'shadow-xl', 'cursor-grabbing');
        }}
        onDragEnd={(e) => {
             (e.target as HTMLDivElement).classList.remove('opacity-70', 'scale-105', 'shadow-xl', 'cursor-grabbing');
        }}
        className="draggable p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm font-semibold text-gray-800 text-center hover:bg-gray-100 transition-all duration-150 cursor-grab"
    >
        {item.text}
    </div>
);

const DropZone: React.FC<{
    target: 'recommended' | 'avoid';
    children: React.ReactNode;
    title: string;
    className: string;
    onDrop: (e: React.DragEvent<HTMLDivElement>, target: 'recommended' | 'avoid') => void;
}> = ({ target, children, title, className, onDrop }) => {
    const [isOver, setIsOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        onDrop(e, target);
        setIsOver(false);
    }

    const baseClasses = "droppable lg:w-1/2 p-4 sm:p-6 rounded-xl shadow-md min-h-[150px] border-2 border-dashed transition-all duration-300";
    const overClasses = "border-indigo-400 bg-indigo-100 scale-105";

    return (
        <div
            data-target={target}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`${baseClasses} ${className} ${isOver ? overClasses : 'border-transparent'}`}
        >
            <h3 className={`text-lg sm:text-xl font-bold mb-4 text-center ${target === 'recommended' ? 'text-teal-800' : 'text-pink-800'}`}>
                {title}
            </h3>
            <div className="space-y-3">
                 {children}
            </div>
        </div>
    );
};


const Phase1: React.FC<Phase1Props> = ({ onComplete }) => {
    const [unplaced, setUnplaced] = useState<Phase1Item[]>(PHASE1_DATA);
    const [recommended, setRecommended] = useState<Phase1Item[]>([]);
    const [avoid, setAvoid] = useState<Phase1Item[]>([]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, target: 'recommended' | 'avoid') => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const item = PHASE1_DATA.find(i => i.id === id);

        if (item) {
            setUnplaced(prev => prev.filter(i => i.id !== id));
            setRecommended(prev => prev.filter(i => i.id !== id));
            setAvoid(prev => prev.filter(i => i.id !== id));
            
            if (target === 'recommended') {
                setRecommended(prev => [...prev, item]);
            } else {
                setAvoid(prev => [...prev, item]);
            }
        }
    }, []);

    const handleSubmit = () => {
        const answers: Phase1Answers = {};
        recommended.forEach(item => (answers[item.id] = 'recommended'));
        avoid.forEach(item => (answers[item.id] = 'avoid'));
        onComplete(answers);
    };
    
    const isComplete = unplaced.length === 0;

    return (
        <div className="phase-screen animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6 text-center">שלב 1 מתוך 2: התאמת מצבים קליניים</h2>
            <p className="text-gray-600 mb-8 text-center">גרור כל היגד קליני אל הקטגוריה המתאימה (מומלץ / נמנע).</p>

            <div className="mb-10 space-y-4 min-h-[80px]">
                {unplaced.map(item => <DraggableItem key={item.id} item={item} />)}
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-6">
                <DropZone target="recommended" title="מומלץ לשקול מתן SGLT2" className="bg-teal-50" onDrop={handleDrop}>
                     {recommended.map(item => <DraggableItem key={item.id} item={item} />)}
                </DropZone>
                <DropZone target="avoid" title="נמנע ממתן SGLT2" className="bg-pink-50" onDrop={handleDrop}>
                     {avoid.map(item => <DraggableItem key={item.id} item={item} />)}
                </DropZone>
            </div>

            <div className="flex justify-center mt-8">
                <button 
                    onClick={handleSubmit} 
                    disabled={!isComplete}
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform enabled:hover:scale-105"
                >
                    מעבר לשלב 2
                </button>
            </div>
        </div>
    );
};

export default Phase1;