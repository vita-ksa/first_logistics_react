import React from 'react'
import {Home} from './home'
import styles from './style'
import {Features} from './features'
import {UseCases} from './useCases'
import {CardDeal} from './cardDeal'
import {Testimonials} from './testimonials'
import {Clients} from './clients'
import {CTA} from './cta'
import {Footer} from './footer'

export const LandingPage = () => {
  return (
    <>
      <div className={`bg-gradient-to-r from-black to-gray ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Home />
        </div>
      </div>
      <div
        className={`bg-gradient-to-r from-black to-gray ${styles.paddingX} ${styles.flexCenter}`}
      >
        <div className={`${styles.boxWidth}`}>
          <Features />
          <UseCases />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div>
    </>
  )
}
