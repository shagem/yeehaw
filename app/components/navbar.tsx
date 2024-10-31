'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Rampart_One } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const rampartOne = Rampart_One({
    subsets: ['latin'],
    weight: '400',
});

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [query, setQuery] = useState(""); 
    const pathname = usePathname();
    const router = useRouter();

    const getLinkClassName = (linkPath: string) => {
        return pathname === linkPath ? 'text-purple-400' : '';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        closeMobileMenu();
    }, [pathname]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        if (query) {
            router.push(`/search?query=${encodeURIComponent(query)}`); 
            setQuery('');
        }
    };

    return (
        <nav className="px-6 pt-2 lg:pt-6 text-white">    
            <section className='max-w-screen-xl mx-auto flex flex-wrap items-center max-md:justify-between gap-4'>
                <Link href="/" className='flex items-center gap-2'>
                    <h1 className={`${rampartOne.className} text-3xl md:text-5xl`}>Yeehaw</h1>
                    <Image
                        src='/popcorn.svg'
                        alt='Yeehaw Popcorn Logo'
                        width={100}
                        height={100}
                        className='h-8 w-8 md:h-12 md:w-12'
                        priority
                    />
                </Link>

                <Link href="/about" className='hidden md:block hover:text-purple-400 transition duration-200 ml-auto'>
                    <p className={`${getLinkClassName('/about')}`}>About</p>
                </Link>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        className="flex items-center p-2 text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="flex items-center max-md:w-full gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="p-2 border-none bg-zinc-800 text-white rounded-md max-md:w-full placeholder:italic placeholder:text-zinc-500"
                    />
                    <button type="submit" className="text-white hover:text-purple-400 transition duration-200 flex items-center justify-center p-2 max-md:hidden">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </form>
            </section>

            {/* Mobile menu */}
            <div
                className={`fixed top-0 right-0 h-screen w-screen flex flex-col items-center bg-zinc-900 transition-transform duration-300 ease-in-out z-[99] p-4 ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={closeMobileMenu}
                    className="self-end text-white mb-4"
                    aria-label="Close Menu"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/about">
                        <p onClick={closeMobileMenu} className={getLinkClassName('/about')}>About</p>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
