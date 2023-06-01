import React from 'react'
import styles from '../style'
import {StartButton} from '../startButton'

export const CTA = () => {
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-gradient-to-r from-black to-gray rounded-[20px] box-shadow`}
    >
      <div className='flex flex-col flex-1'>
        <h2 className={styles.heading2}>Let’s try our service now!</h2>
        <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
          Everything you need to .....
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <StartButton />
      </div>
    </section>
  )
}
