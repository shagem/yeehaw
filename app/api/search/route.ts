import { NextResponse } from 'next/server';

type SearchItem = {
    id: number; 
    title: string;
    poster_path: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
    type: 'movie' | 'tv';
    scoreColor?: string;
    roundedScore?: number;
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    if (!query) {
        return NextResponse.json({ results: [] }, { status: 400 });
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page}`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Type assertion for the results
        const results: SearchItem[] = data.results.map((item: any) => {
            const { color, score } = getScoreStyle(item.vote_average);
            return {
                id: item.id,
                title: item.title || item.name,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                release_date: item.release_date,
                first_air_date: item.first_air_date,
                type: item.media_type === 'movie' ? 'movie' : 'tv',
                scoreColor: color,
                roundedScore: score 
            };
        });

        return NextResponse.json({ results, page: data.page, total_pages: data.total_pages });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
