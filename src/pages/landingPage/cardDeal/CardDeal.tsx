import React from 'react'
import styles, {layout} from '../style'
import card from 'assets/img/card.png'
import {StartButton} from '../startButton'

export const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Scale your online store’s <br className='hidden sm:block' /> day-to-day shipping
          experience
        </h2>
        <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
          Easily manage your online store’s daily shipping operations from preparations to dispatch
          with OTO’s gateway. We help you pick, pack, ship, and deliver your orders on time, in
          full, and at an affordable cost.
        </p>

        <StartButton styles={`mt-10`} />
      </div>

      <div className={layout.sectionImg}>
        <img src={card} alt='billing' className='w-[100%] h-[100%]' />
      </div>
    </section>
  )
}
