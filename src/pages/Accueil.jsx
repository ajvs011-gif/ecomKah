import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import ShopCollection from '../components/ShopCollection'

const Accueil = () => {
  return (
    <div className='mt-[80px]'>
      <HeroSection/>
      <ShopCollection />
      {/* <FeaturesSection/> */}
    </div>
  )
}

export default Accueil
