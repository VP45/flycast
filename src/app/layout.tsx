import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import './globals.css'
import Providers from './Providers'

export const metadata = {
  title: 'FlyCast',
  description: 'Fligt price predictor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='max-w-[1400px] mx-auto flex justify-center items-center flex-col'>
         <Providers>
          <Navbar/>
          {children}
          <Footer/>
         </Providers>
        </body>
    </html>
  )
}
