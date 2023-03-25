"use client"
import { usePathname } from 'next/navigation'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import './globals.css'
import Providers from './Providers'

// export const metadata = {
//   title: 'FlyCast',
//   description: 'Fligt price predictor.',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const showLayout = pathname === '/search/map' ? false : true;
  return (
    <html lang="en">
      <body className='w-screen max-w-screen-2xl mx-auto flex justify-center items-center flex-col'>
         <Providers>
          {showLayout && <Navbar/>}
          {children}
          {showLayout && <Footer/>}
         </Providers>
        </body>
    </html>
  )
}
