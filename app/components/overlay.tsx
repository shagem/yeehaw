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

        // Disable background scrolling when overlay is open
        document.body.style.overflow = 'hidden';

        //If entry selected is not an actor fetch the cast
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

        // Restore background scrolling on component unmount
        return () => {
            document.body.style.overflow = '';
        };

    }, [id, isActor]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20 ${show ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
            <div className="flex flex-col justify-center items-center bg-zinc-800 border border-zinc-700 m-4 p-4 md:p-8 rounded relative lg:max-w-screen-md max-h-full overflow-y-auto">
                <button
                    onClick={() => {
                        setShow(false);
                        setTimeout(onClose, 300);
                    }}
                    className="absolute top-2 right-2 text-white hover:text-purple-400">
                    <span className="material-symbols-outlined">close</span>
                </button>
                
                <div className="overflow-y-auto max-h-[90vh] w-full flex flex-col items-center gap-6">
                    <section className='flex flex-col items-center text-center'>
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
                            <p className="text-sm">Original Air Date: {releaseDate}</p>
                        ) : (
                            releaseDate && (
                                <p className="text-sm">Release Date: {releaseDate}</p>
                            )
                        )}
                        {score !== undefined && (
                            <p className="text-sm">
                                Average Score: <span className={`${score < 5 ? 'text-red-300' : score <= 7 ? 'text-yellow-300' : 'text-green-500'}`}>
                                    {Math.round((score + Number.EPSILON) * 10) / 10}
                                </span>
                            </p>
                        )}
                    </section>
                    <section className='text-sm'>
                        {overview && (
                            <p>
                                &quot;{overview || 'No summary available.'}&quot;
                            </p>
                        )}
                    </section>
                    {knownFor && knownFor.length > 0 && (
                    <section className="w-full max-w-[320px] text-sm">
                        <p className='italic w-full text-center'>Known For:</p>
                        <ul className="list-disc w-full flex flex-col items-center">
                            {knownFor.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>
                    )}
                    {cast.length > 0 && (
                    <section className="w-full text-sm my-2">
                        <p className='italic mb-4'>Featuring:</p>
                        <ul className="list-none w-full grid grid-cols-2 md:flex md:flex-wrap md:items-center md:justify-evenly gap-y-8 gap-x-4">
                            {cast.slice(0, 10).map((actor) => (
                                <li key={actor.id} className='flex flex-col items-center justify-between gap-2 text-center max-sm:text-xs border border-zinc-600 rounded-lg p-2'>
                                    <p>{actor.character}</p>
                                    <Image
                                    src={actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                    : '/placeholder.png' 
                                    }
                                    alt='Actor Profile Picture'
                                    height={50}
                                    width={50}
                                    className='rounded-full bg-white min-h-[50px]'
                                    />
                                    <p className='font-bold'>{actor.name}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default Overlay;
