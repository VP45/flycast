"use client"
import { getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
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
  children
}: {
  children: React.ReactNode,
  session: any,
}): JSX.Element {
  const pathname = usePathname();
  const showLayout = pathname?.includes('/search/map') ? false : true;

  // const session = getServerSession();
  return (
    <SessionProvider>
      <html lang="en">
      <body className='w-screen max-w-screen-2xl mx-auto flex justify-center items-center flex-col'>
        <Providers>
          {showLayout && <Navbar />}
          {children}
          {showLayout && <Footer />}
        </Providers>
      </body>
    </html>
    </SessionProvider>
  )
}
