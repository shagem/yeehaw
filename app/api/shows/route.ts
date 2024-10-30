import { NextResponse } from 'next/server';

type TVShow = {
    id: number;
    name: string;
    poster_path?: string;
    first_air_date?: string;
    vote_average?: number;
    overview?: string;
};

export async function GET(request: Request) {
    const endpoint = 'https://api.themoviedb.org/3/trending/tv/week?language=en-US';

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
            throw new Error('Failed to fetch TV shows');
        }
        const data = await response.json();

        // Filter and enhance shows with score color
        const filteredShows = data.results
            .filter((show: TVShow) =>
                show.id &&
                show.name &&
                show.poster_path &&
                show.first_air_date &&
                show.overview &&
                typeof show.vote_average === 'number' &&
                show.vote_average > 0
            )
            .map((show: TVShow) => {
                const roundedScore = show.vote_average !== undefined
                    ? Math.round(show.vote_average * 10) / 10
                    : 0;

                let scoreColor = 'text-white'; // Default color

                if (roundedScore < 4.9) {
                    scoreColor = 'text-red-400'; // Red for scores below 4.9
                } else if (roundedScore >= 5 && roundedScore <= 7) {
                    scoreColor = 'text-yellow-300'; // Yellow for scores between 5 and 7.9
                } else {
                    scoreColor = 'text-green-500'; // Green for scores between 8 and 10
                }

                return {
                    ...show,
                    roundedScore,
                    scoreColor,
                };
            });

        // Return the filtered shows with score colors
        return NextResponse.json({ results: filteredShows });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
