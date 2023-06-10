import React from 'react'
import styles, {layout} from '../style'
import google from 'assets/icons/google.svg'
import {motion} from 'framer-motion'
import {landingAnimations} from 'constants/animations'

export const UseCases = () => {
  return (
    <motion.div
      variants={landingAnimations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{duration: 1}}
    >
      <section className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={layout.sectionInfo}>
          <h2 className={styles.heading2}>
            Sell on many social platforms and ship with one
            <br className='hidden sm:block' /> all-inclusive dashboard.
          </h2>
          <p className={`${styles.paragraph}  max-w-[470px] mt-5`}>
            First logistics is a shipping gateway that helps you as a social seller to get
            discounted shipping rates up to 90%, instant access to +180 shipping company, and
            powerful tracking and return systems.
          </p>

          {/* <Button styles={`mt-10`} /> */}
        </div>

        <div className={layout.sectionImg}>
          <img
            src={'https://tryoto.com/wp-content/uploads/2023/01/svgviewer-output-63.svg'}
            alt='billing'
            className='w-[100%] h-[100%]'
          />
        </div>
      </section>
    </motion.div>
  )
}
