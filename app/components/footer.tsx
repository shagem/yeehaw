import Link from "next/link"

export default function Footer() {
    return (
    <>
    <footer className='pb-2 pt-12 px-6'>
        <section className='max-w-screen-xl mx-auto grid grid-cols-2 border-t border-zinc-700 text-white'>
            <div>

            </div>
            <div>

            </div>
            <div className='col-span-2'>
                <p className='text-sm text-zinc-500 text-center'>© 2024 Yeehaw | All Rights Reserved | <Link href='/about' className='italic hover:text-purple-400 transition duration-200'>About</Link></p>
            </div>
        </section>
    </footer>
    </>
    );
}