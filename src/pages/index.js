import React from 'react'

import Navigation from '../components_clone/Navigation/navigation'
import Hero from '../components_clone/Hero/hero'
import Cards from '../components_clone/Card/container'
import Calculator from '../components_clone/Calculator/calculator'
import TextBlock from '../components_clone/Calculator/textBlock'
import Footer from '../components_clone/Footer/footer'
import useWindowSize from '../custom-hooks/useWindow'

export default function RootIndex() {
  const { width } = useWindowSize()
  return (
    <>
      <div style={{ backgroundColor: 'rgba(250,253,255,255)' }}>
        <Hero navbar={<Navigation />} />
        <Cards />
        <div style={{ display: width <= 768 ? 'block' : 'flex' }}>
          <Calculator />
          <TextBlock />
        </div>
        <Footer />
      </div>
    </>
  )
}
