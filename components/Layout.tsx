import React from 'react'
import Header from './Header'
import { Footer } from './Footer'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className='h-full flex flex-col flex-1'>
        <Header />
        <div className='flex-1'>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout