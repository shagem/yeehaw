import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back_ios,arrow_forward_ios,close,local_fire_department,menu,star" />
        
      </head>
      <body className='bg-zinc-950'>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
