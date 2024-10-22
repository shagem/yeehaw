import { NextResponse } from 'next/server';

export async function GET() {
const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
};

try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', options);
    if (!response.ok) {
    throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return NextResponse.json(data);
} catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
}
}
