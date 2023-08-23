import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from './ReduxProvider'
import Navbar from './Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo Nextjs',
  description: 'todo app next js',
}

export default function RootLayout({
  children, params
}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <ReduxProvider>
      <html lang={params.lang}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* bootstrap css 5.3 */}
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossOrigin="anonymous"/>

          {/* font awesome 6.4.2 */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
        <body className={inter.className}>
          <header>
            <Navbar params={params}/>
          </header>
          <img className='position-fixed start-0' src="/images/background.png" alt="background decorate" style={{zIndex: "-1", top:"3rem"}}/>
          <div className='position-relative App'>
            {children}
          </div>
        </body>
      </html>
    </ReduxProvider>
  )
}