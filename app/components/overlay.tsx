import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type OverlayProps = {
    id: number;
    title: string;
    posterPath: string;
    releaseDate?: string; 
    score?: number; 
    overview?: string; 
    knownFor?: string[]; 
    onClose: () => void;
    isTVShow?: boolean;
    isActor?: boolean;
};

const Overlay: React.FC<OverlayProps> = ({
    id,
    title,
    posterPath,
    releaseDate,
    score,
    overview,
    knownFor,
    onClose,
    isTVShow = false,
    isActor = false
}) => {
    const [show, setShow] = useState(false);
    const [cast, setCast] = useState<any[]>([]); 

    useEffect(() => {
        setShow(true); // Trigger fade-in on component mount

        if (!isActor) {
            const fetchCast = async () => {
                const response = await fetch(`/api/people?itemId=${id}&type=cast&isTVShow=${isTVShow}`);
                if (response.ok) {
                    const data = await response.json();
                    setCast(data.cast || []); // Set cast data
                }
            };

            fetchCast();
        }
    }, [id, isActor]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20 ${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
            <div className="flex flex-col justify-center items-center bg-zinc-800 border border-zinc-700 p-8 rounded relative max-md:max-w-[350px] w-[350px] md:w-[500px]">
                <button
                    onClick={() => {
                        setShow(false);
                        setTimeout(onClose, 300);
                    }}
                    className="absolute top-2 right-2 text-white hover:text-purple-400">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                    alt={title}
                    width={300}
                    height={450}
                    className="w-[175px] max-h-[250px] object-cover mb-2 shadow-[0_3px_5px_0px_rgba(0,0,0,0.7)]"
                    loading="lazy"
                />
                <p className="font-bold text-lg text-center">{title}</p>
                {isTVShow ? (
                    <p className="text-sm">
                        Original Air Date: {releaseDate}
                    </p>
                ) : (
                    releaseDate && (
                        <p className="text-sm">
                            Release Date: {releaseDate}
                        </p>
                    )
                )}
                {score !== undefined && (
                    <p className="text-sm">
                        Average Score: <span className={`${score < 5 ? 'text-red-300' : score <= 7 ? 'text-yellow-300' : 'text-green-500'}`}>
                            {Math.round((score + Number.EPSILON) * 10) / 10}
                        </span>
                    </p>
                )}
                <div className='text-sm mt-2'>
                    {overview && (
                        <>
                            <p className='italic w-full'>Summary:</p>
                            <p className="mt-1">
                            &quot;{overview || 'No summary available.'}&quot;
                            </p>
                        </>
                    )}
                </div>
                {knownFor && knownFor.length > 0 && (
                    <div className="mt-2 w-full max-w-[320px] text-sm">
                        <p className='italic w-full text-center'>Known For:</p>
                        <ul className="list-disc w-full flex flex-col items-center">
                            {knownFor.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {cast.length > 0 && (
                    <div className="mt-2 w-full max-w-[320px] text-sm">
                        <p className='italic w-full text-center'>Cast:</p>
                        <ul className="list-disc w-full flex flex-col items-center">
                            {cast.slice(0, 10).map((actor) => (
                                <li key={actor.id}>{actor.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overlay;
