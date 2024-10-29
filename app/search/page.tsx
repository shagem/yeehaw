"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Overlay from '../components/overlay';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
};

const getScoreStyle = (score?: number) => {
    if (score === undefined || score === 0) return { color: 'white', score: undefined };
    const roundedScore = Math.round((score + Number.EPSILON) * 10) / 10;
    let color = '';

    if (roundedScore < 4.9) color = 'text-red-300';
    else if (roundedScore >= 5 && roundedScore <= 7) color = 'text-yellow-300';
    else color = 'text-green-500';

    return { color, score: roundedScore };
};

const SearchPage = ({ searchParams }: { searchParams: { query: string } }) => {
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<Movie | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); 

    useEffect(() => {
        setResults([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [searchParams.query]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchParams.query && hasMore) {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchParams.query)}&page=${currentPage}`);
                const data = await response.json();
        
                if (data.results) {
                    setResults((prevResults) => {
                        const existingIds = new Set(prevResults.map((movie: Movie) => movie.id));
                        const newResults = data.results.filter((movie: Movie) => !existingIds.has(movie.id));
                        return [...prevResults, ...newResults];
                    });
                    setHasMore(data.page < data.total_pages);
                } else {
                    setHasMore(false);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [searchParams.query, currentPage]);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if (nearBottom && !loading && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    if (loading && currentPage === 1) return <p>Loading...</p>;

    return (
        <main className="text-white px-6">
            <section className="max-w-screen-xl mx-auto">
                <p className="font-semibold text-xl my-4">Search Results for &quot;{searchParams.query}&quot;</p>
                <div className="flex flex-wrap gap-y-16 gap-x-6 justify-center">
                    {results.length > 0 ? (
                        results
                            .filter(movie => 
                                movie.poster_path && 
                                movie.title && 
                                (movie.release_date || movie.first_air_date) && 
                                movie.vote_average !== undefined && 
                                movie.vote_average !== 0
                            )
                            .map((movie) => {
                                const { color, score } = getScoreStyle(movie.vote_average);
                                const formattedReleaseDate = movie.release_date
                                    ? new Date(movie.release_date).toLocaleDateString()
                                    : 'Release date not available';
                                const formattedAirDate = movie.first_air_date
                                    ? new Date(movie.first_air_date).toLocaleDateString()
                                    : 'Air date not available';

                                return (
                                    <div 
                                        key={movie.id} 
                                        className="flex flex-col items-center border border-zinc-700 rounded max-w-[400px] hover:bg-zinc-800 transition duration-300 cursor-pointer lg:w-[300px]"
                                        onClick={() => setSelectedItem(movie)}
                                    >
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title || 'No title available'}
                                            width={500}
                                            height={750}
                                            className="w-full h-[350px] lg:h-[400px] object-cover"
                                            loading="lazy"
                                        />
                                        <div className="text-sm p-4 min-w-full">
                                            <p className="font-bold text-xl">{movie.title}</p>
                                            {movie.release_date && (
                                                <p className="text-xs text-gray-500">Release Date: {formattedReleaseDate}</p>
                                            )}
                                            {movie.first_air_date && (
                                                <p className="text-xs text-gray-500">Air Date: {formattedAirDate}</p>
                                            )}
                                            {score !== undefined && (
                                                <p className="text-xs">Average Score: <span className={`${color}`}>{score}</span></p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>

                {/* Overlay for selected item */}
                {selectedItem && (
                    <Overlay
                        title={selectedItem.title}
                        posterPath={selectedItem.poster_path}
                        releaseDate={
                            selectedItem.release_date
                                ? new Date(selectedItem.release_date).toLocaleDateString()
                                : selectedItem.first_air_date
                                    ? new Date(selectedItem.first_air_date).toLocaleDateString()
                                    : 'Date not available'
                        }
                        score={selectedItem.vote_average}
                        onClose={() => setSelectedItem(null)}
                        isTVShow={Boolean(selectedItem.first_air_date)}
                    />
                )}
            </section>
        </main>
    );
};

export default SearchPage;
