import React from 'react'

import Navigation from '../components_clone/Navigation/navigation'
import Hero from '../components_clone/Hero/hero'
import Cards from '../components_clone/Card/container'
import Calculator from '../components_clone/Calculator/calculator'
import TextBlock from '../components_clone/Calculator/textBlock'
import Footer from '../components_clone/Footer/footer'

import * as styles from './global.module.css'
import Logo from '../../static/images/SDlogo.png'

import useWindowSize from '../custom-hooks/useWindow'
export default function RootIndex() {
  const { width } = useWindowSize()
  return (
    <div style={{ position: 'relative' }}>
      <section className={styles.floatingLogo}>
        <img src={Logo} alt="logo sd" />
      </section>
      <div
        style={{
          backgroundColor: 'rgba(250,253,255,255)',
          padding: width > 1024 ? '0 10rem' : 0,
        }}
      >
        <Hero navbar={<Navigation />} />
        <Cards />
        <div
          style={{
            display: width <= 768 ? 'block' : 'flex',
          }}
        >
          <Calculator />
          <TextBlock />
        </div>
        <Footer />
      </div>
    </div>
  )
}
