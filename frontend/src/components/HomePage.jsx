import React from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Manager from './Password.jsx'


function HomePage() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar at the top */}
      <header>
        <Navbar />
      </header>



      {/* Main content area expands to fill space */}
      <main className="flex-1 bg-green-50 p-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <Manager />
      </main>

      {/* Footer always at bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default HomePage




