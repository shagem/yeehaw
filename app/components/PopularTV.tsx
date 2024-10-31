"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Overlay from './overlay';

type TVShow = {
    id: number;
    name: string;  
    poster_path?: string;
    first_air_date?: string;
    overview?: string;
    scoreColor?: string;
    roundedScore?: number;
};

const TrendingShows = () => {
    const [shows, setShows] = useState<TVShow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch('/api/shows');
                if (!response.ok) {
                    throw new Error('Failed to fetch shows');
                }
                const data = await response.json();

                setShows(data.results);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchShows();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleShowClick = (show: TVShow) => {
        setSelectedShow(show);
    };

    const closeOverlay = () => {
        setSelectedShow(null);
    };

    return (
        <div className="relative my-4">
            <div ref={scrollRef} className="flex overflow-x-scroll space-x-4 scrollContainer">
                {shows.map((show) => {
                    const imageUrl = show.poster_path
                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                        : 'https://via.placeholder.com/500x750';

                    const formattedAirDate = show.first_air_date
                        ? new Date(show.first_air_date).toLocaleDateString()
                        : 'Air date not available';

                    return (
                        <div
                            key={show.id}
                            onClick={() => handleShowClick(show)}
                            className="min-w-[250px] lg:min-w-[305px] overflow-hidden rounded border border-zinc-700 mb-2 snap-center cursor-pointer hover:bg-zinc-800 transition duration-300"
                        >
                            <Image
                                src={imageUrl}
                                alt={show.name}
                                width={500}
                                height={750}
                                className="w-full h-[350px] lg:h-[400px] object-cover"
                                loading="lazy"
                            />
                            <div className="p-2 lg:p-4">
                                <p className="font-bold text-sm lg:text-lg">{show.name}</p>
                                <p className="text-gray-500 text-xs">Original Air Date: {formattedAirDate}</p>
                                <p className='text-xs'>Average Score: <span className={show.scoreColor}>{show.roundedScore}</span></p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left scroll button */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute top-1/2 transform -translate-y-1/2 -left-3 z-10 h-full w-10 group flex items-center justify-center bg-gradient-to-r from-zinc-950 to-translucent">
                <span className="material-symbols-outlined group-hover:scale-[1.5] transition duration-200">arrow_back_ios</span>
            </button>

            {/* Right scroll button */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute top-1/2 transform -translate-y-1/2 -right-3 z-10 h-full w-10 group flex items-center justify-center bg-gradient-to-l from-zinc-950 to-translucent">
                <span className="material-symbols-outlined group-hover:scale-[1.5] transition duration-200">arrow_forward_ios</span>
            </button>

            {/* Overlay for selected show */}
            {selectedShow && (
                <Overlay
                    id={selectedShow.id}
                    title={selectedShow.name}
                    posterPath={selectedShow.poster_path || ''}
                    releaseDate={new Date(selectedShow.first_air_date || '').toLocaleDateString()}
                    score={selectedShow.roundedScore}
                    overview={selectedShow.overview || ''}
                    onClose={closeOverlay}
                    isTVShow={true}
                />
            )}
        </div>
    );
};

export default TrendingShows;
