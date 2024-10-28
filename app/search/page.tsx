"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
};

const getScoreStyle = (score?: number) => {
    if (score === undefined) return { color: 'white', score: 0 }; // Fallback if no score
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

const SearchPage = ({ searchParams }: { searchParams: { query: string } }) => {
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (searchParams.query) {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchParams.query)}`);
                const data = await response.json();
                setResults(data.results || []);
            }
            setLoading(false);
        };
        fetchData();
    }, [searchParams.query]);

    if (loading) return <p>Loading...</p>;

    return (
        <main className='text-white px-6'>
            <section className='max-w-screen-xl mx-auto'>
                <p className='font-semibold text-xl my-4'>Search Results for &quot;{searchParams.query}&quot;</p>
                <div className='flex flex-wrap gap-y-16 gap-x-6 justify-center'>
                    {results.length > 0 ? (
                        results
                            .filter(movie => movie.id && movie.title && movie.poster_path && movie.vote_average !== 0) // Filter out invalid entries and zero scores
                            .map((movie) => {
                                const { color, score } = getScoreStyle(movie.vote_average);

                                // Release date for movies
                                const formattedReleaseDate = movie.release_date
                                    ? new Date(movie.release_date).toLocaleDateString()
                                    : 'Release date not available';

                                // Air Date for TV shows
                                const formattedAirDate = movie.first_air_date
                                    ? new Date(movie.first_air_date).toLocaleDateString()
                                    : 'Air date not available';

                                return (
                                    <div key={movie.id} className="flex flex-col items-center border border-zinc-700 rounded max-w-[400px]">
                                        {movie.poster_path && (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                width={500}
                                                height={750}
                                                className="object-cover"
                                                loading='lazy'
                                            />
                                        )}
                                        <div className='text-sm p-4 min-w-full'>
                                            <p className="font-bold text-xl">{movie.title}</p>
                                            {movie.release_date && (
                                                <p className="text-xs text-gray-500">Release Date: {formattedReleaseDate}</p>
                                            )}
                                            {movie.first_air_date && (
                                                <p className="text-xs text-gray-500">Air Date: {formattedAirDate}</p>
                                            )}
                                            <p className='text-xs'>Average Score: <span className={`${color}`}>{score}</span></p>
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default SearchPage;
