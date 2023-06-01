import React from 'react'
import styles, {layout} from '../style'
import apple from 'assets/icons/default-small.svg'
import google from 'assets/icons/google.svg'
import bill from 'assets/img/bill.png'

export const UseCases = () => {
  return (
    <section id='use-Cases' className={layout.sectionReverse}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Sell on many social platforms and ship with one
          <br className='hidden sm:block' /> all-inclusive dashboard.
        </h2>
        <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
          First logistics is a shipping gateway that helps you as a social seller to get discounted
          shipping rates up to 90%, instant access to +180 shipping company, and powerful tracking
          and return systems.
        </p>

        {/* <Button styles={`mt-10`} /> */}
      </div>

      <div className={layout.sectionImg}>
        <img src={apple} alt='billing' className='w-[100%] h-[100%]' />
      </div>
    </section>
  )
}
