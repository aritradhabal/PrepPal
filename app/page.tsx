import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import Footer from './_components/Footer'

function page() {
  return (
    <div className='max-h-svh flex flex-col'>

      <Header/>
      <Hero/>
      <Footer/>

    </div>
  )
}

export default page