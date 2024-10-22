// Overlay.tsx
import React from 'react';
import Image from 'next/image';

type OverlayProps = {
    title: string;
    posterPath: string;
    releaseDate: string;
    score: number | undefined;
    overview: string;
    onClose: () => void;
    isTVShow?: boolean; // New prop to indicate if it's a TV show
};

const Overlay: React.FC<OverlayProps> = ({
    title,
    posterPath,
    releaseDate,
    score,
    overview,
    onClose,
    isTVShow = false, // Default to false if not provided
}) => {
    const getScoreStyle = (score?: number) => {
        if (score === undefined) return { color: 'white' }; // Fallback if no score
        const roundedScore = Math.round((score + Number.EPSILON) * 10) / 10; // Round to tenths
        let color = '';

        if (roundedScore < 4.9) {
            color = 'text-red-300'; // Red for scores below 4.9
        } else if (roundedScore >= 5 && roundedScore <= 7) {
            color = 'text-yellow-300'; // Yellow for scores between 5 and 7.9
        } else {
            color = 'text-green-500'; // Green for scores between 8 and 10
        }

        return { color, score: roundedScore };
    };

    const { color, score: roundedScore } = getScoreStyle(score);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
            <div className="flex flex-col justify-center bg-zinc-800 border border-zinc-700 p-8 rounded relative max-w-[600px]">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white hover:text-purple-400">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    width={300}
                    height={450}
                    className="w-[175px] max-h-[250px] object-cover mb-2"
                />
                <h2 className="font-bold text-lg">{title}</h2>
                <p className="text-sm">
                    {isTVShow ? 'Original Air Date:' : 'Release Date:'} {releaseDate}
                </p>
                <p className="text-sm">
                    Average Score: <span className={`${color}`}>{roundedScore}</span>
                </p>
                <p className='italic'>Summary:</p>
                <p className="text-sm mt-2 max-w-[400px]">
                    "{overview || 'No summary available.'}"
                </p>
            </div>
        </div>
    );
};

export default Overlay;
