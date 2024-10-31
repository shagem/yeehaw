import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Yeehaw",
    description: "Movie Search Engine using Next.js and TMDb API",
};

export default function About() {
    return (
    <>
        <main className='text-white p-8'>
            <section className='max-w-screen-xl mx-auto'>
                <div className='flex flex-col items-center justify-center py-40 text-center'>
                    <p>Work in Progress!</p>
                    <p>Made possible by <a className='hover:text-purple-400 transition duration-200 decoration-1 underline' href='https://www.themoviedb.org/' target='_blank'>The Movie Database API.</a></p>
                </div>
            </section>
        </main>
    </>
    );
}