import type { Metadata } from "next";
import PopularMovies from './components/PopularMovies';
import PopularTV from './components/PopularTV';
import TopRatedMovies from './components/TopRatedMovies';
import PopularActors from './components/PopularActors';


export const metadata: Metadata = {
  title: "Yeehaw | Entertainment Search Engine",
  description: "Entertainment Search Engine using Next.js and TMDb API",
};

export default function Home() {
  return (
    <>
      <main className='px-6'>
        <section className='max-w-screen-xl mx-auto text-white my-12'>
          <p className='font-bold text-3xl max-sm:text-center'>Find Movies <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"><br/>TV Shows and More!</span></p>
        </section>
        <section className='max-w-screen-xl mx-auto text-white mb-10 pb-10 border-b border-zinc-700'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-xl'>Trending Movies</p>
            <span className="material-symbols-outlined md-24 text-green-400">trending_up</span>
          </div>
          <PopularMovies />
        </section>
        <section className='max-w-screen-xl mx-auto text-white mb-10 pb-10 border-b border-zinc-700'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-xl'>Trending TV Shows</p>
            <span className="material-symbols-outlined md-24 text-green-400">trending_up</span>
          </div>
          <PopularTV />
        </section>
        <section className='max-w-screen-xl mx-auto text-white mb-10 pb-10 border-b border-zinc-700'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-xl'>Top Rated Movies</p>
            <span className="material-symbols-outlined md-24 filled text-yellow-400">trophy</span>
          </div>
          <TopRatedMovies />
        </section>
        <section className='max-w-screen-xl mx-auto text-white'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-xl'>Actors & Actresses</p>
            <span className="material-symbols-outlined md-24 filled text-purple-500">comedy_mask</span>
          </div>
          <PopularActors />
        </section>
      </main>
    </>
  );
}
