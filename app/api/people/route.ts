import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');
    const type = searchParams.get('type');
    const isTVShow = searchParams.get('isTVShow') === 'true'; // Ensure boolean conversion
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
    };

    let endpoint: string;

    switch (type) {
        case 'cast':
            if (!itemId) {
                return NextResponse.json({ error: 'itemId parameter is required for cast' }, { status: 400 });
            }
            if (isTVShow) {
                // Ensure this path is correct
                endpoint = `https://api.themoviedb.org/3/tv/${itemId}/credits?language=en-US`;
            } else {
                endpoint = `https://api.themoviedb.org/3/movie/${itemId}/credits?language=en-US`;
            }
            break;

        case 'popular':
            endpoint = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
            break;

        default:
            return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching data:', errorData);
            return NextResponse.json({ error: errorData.status_message }, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error during fetch:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
