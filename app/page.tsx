import type { Metadata } from "next";
import PopularMovies from './components/PopularMovies';
import PopularTV from './components/PopularTV';

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
            <span className="material-symbols-outlined md-24 filled text-orange-400">local_fire_department</span>
          </div>
          <PopularMovies />
        </section>
        <section className='max-w-screen-xl mx-auto text-white mb-10 pb-10 border-b border-zinc-700'>
          <div className='flex items-center gap-1'>
            <p className='font-semibold text-xl'>Trending TV Shows</p>
            <span className="material-symbols-outlined md-24 filled text-orange-400">local_fire_department</span>
          </div>
          <PopularTV />
        </section>
      </main>
    </>
  );
}
