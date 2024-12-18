"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Overlay from './overlay';

type Movie = {
    id: number;
    title: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    overview?: string;
    roundedScore?: number;
    scoreColor?: string;
};

const TopRatedMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/api/movies?type=top_rated');
                if (!response.ok) {
                    throw new Error('Failed to fetch top-rated movies');
                }
                const data = await response.json();
                setMovies(data.results);
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

        fetchMovies();
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

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const closeOverlay = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="relative my-4">
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll space-x-4 scrollContainer"
            >
                {movies.map((movie) => {
                    const imageUrl = movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750';

                    const formattedReleaseDate = movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString()
                        : 'Release date not available';

                    return (
                        <div
                            key={movie.id}
                            onClick={() => handleMovieClick(movie)}
                            className="min-w-[250px] lg:min-w-[305px] overflow-hidden rounded border border-zinc-700 mb-2 snap-center cursor-pointer hover:bg-zinc-800 transition duration-300"
                        >
                            <Image
                                src={imageUrl}
                                alt={movie.title}
                                width={500}
                                height={750}
                                className="w-full h-[350px] lg:h-[400px] object-cover"
                                loading="lazy"
                            />
                            <div className="p-2 lg:p-4">
                                <p className="font-bold text-sm lg:text-lg">{movie.title}</p>
                                <p className="text-gray-500 text-xs">Release Date: {formattedReleaseDate}</p>
                                <p className="text-xs">
                                    Average Score: <span className={`${movie.scoreColor}`}>{movie.roundedScore}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Left scroll button */}
            <button
                onClick={() => handleScroll('left')}
                className="absolute top-1/2 transform -translate-y-1/2 -left-3 z-10 h-full w-10 flex items-center justify-center bg-gradient-to-r from-zinc-950 to-transparent">
                <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>

            {/* Right scroll button */}
            <button
                onClick={() => handleScroll('right')}
                className="absolute top-1/2 transform -translate-y-1/2 -right-3 z-10 h-full w-10 flex items-center justify-center bg-gradient-to-l from-zinc-950 to-transparent">
                <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>

            {/* Overlay for selected movie */}
            {selectedMovie && (
                <Overlay
                    title={selectedMovie.title}
                    posterPath={selectedMovie.poster_path || ''}
                    releaseDate={new Date(selectedMovie.release_date || '').toLocaleDateString()}
                    score={selectedMovie.vote_average}
                    overview={selectedMovie.overview || ''}
                    onClose={closeOverlay}
                    id={selectedMovie.id}
                    isTVShow={false}
                />
            )}
        </div>
    );
};

export default TopRatedMovies;
