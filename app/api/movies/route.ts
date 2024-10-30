import { NextResponse } from 'next/server';

type Movie = {
    id: number;
    title: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    overview?: string;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let endpoint;
    switch (type) {
        case 'top_rated':
            endpoint = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US';
            break;
        case 'popular':
            endpoint = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
            break;
        default:
            return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
    };

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        // Filter and enhance movies with score color
        const filteredMovies = data.results
        .filter((movie: Movie) =>
            movie.id &&
            movie.title &&
            movie.poster_path &&
            movie.release_date &&
            movie.overview &&
            typeof movie.vote_average === 'number' &&
            movie.vote_average > 0
        )
        .map((movie: Movie) => {
            const roundedScore = movie.vote_average !== undefined
                ? Math.round((movie.vote_average + Number.EPSILON) * 10) / 10 // Round to tenths
                : 0; // Fallback if no score is available

            let scoreColor = 'text-white'; // Default color

            if (roundedScore < 4.9) {
                scoreColor = 'text-red-400'; // Red for scores below 4.9
            } else if (roundedScore >= 5 && roundedScore <= 7) {
                scoreColor = 'text-yellow-300'; // Yellow for scores between 5 and 7.9
            } else {
                scoreColor = 'text-green-500'; // Green for scores between 8 and 10
            }

            return {
                ...movie,
                roundedScore,
                scoreColor,
            };
        });

        // Return the filtered movies with score colors
        return NextResponse.json({ results: filteredMovies });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
