"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Overlay from './overlay';

type Actor = {
    id: number;
    name: string;
    profile_path?: string;
    known_for?: {
        title?: string;
        name?: string;
    }[];
};

const PopularActors = () => {
    const [actors, setActors] = useState<Actor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch('/api/people?type=popular');
                if (!response.ok) {
                    throw new Error('Failed to fetch actors');
                }
                const data = await response.json();
                setActors(data.results);
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

        fetchActors();
    }, []);

    const handleActorClick = (actor: Actor) => {
        setSelectedActor(actor);
    };

    const closeOverlay = () => {
        setSelectedActor(null);
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative my-4">
            <div ref={scrollRef} className="flex overflow-x-scroll gap-4 scrollContainer">
                {actors.map((actor) => {
                    const imageUrl = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : 'https://via.placeholder.com/500x750';

                    return (
                        <div
                            key={actor.id}
                            onClick={() => handleActorClick(actor)}
                            className="min-h-40 min-w-60 overflow-hidden mb-2 snap-center cursor-pointer hover:bg-zinc-800 transition duration-300"
                        >
                            <Image
                                src={imageUrl}
                                alt={actor.name}
                                width={500}
                                height={750}
                                className="object-cover rounded-t"
                            />
                            <div className="p-2 text-center">
                                <p className="font-bold text-sm">{actor.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left scroll button */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute top-1/2 transform -translate-y-1/2 -left-3 z-10 h-full w-10 flex items-center justify-center bg-gradient-to-r from-zinc-950 to-translucent">
                <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>

            {/* Right scroll button */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute top-1/2 transform -translate-y-1/2 -right-3 z-10 h-full w-10 flex items-center justify-center bg-gradient-to-l from-zinc-950 to-translucent">
                <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>

            {/* Overlay for selected actor */}
            {selectedActor && (
                <Overlay
                    id={selectedActor.id}
                    title={selectedActor.name}
                    posterPath={selectedActor.profile_path || ''}
                    knownFor={
                        (selectedActor.known_for?.map(item => item.title || item.name).filter(Boolean) as string[]) || []
                    }
                    onClose={closeOverlay}
                    isActor={true}
                />
            )}
        </div>
    );
};

export default PopularActors;
