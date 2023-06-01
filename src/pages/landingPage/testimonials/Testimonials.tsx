import React from 'react'
import styles from '../style'
import {feedback} from 'constants/landing-data'

const FeedbackCard = ({content, name, title, img}: any) => (
  <div className='flex justify-between flex-col px-10 py-12 rounded-[20px]  max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card'>
    <img src={'quotes'} alt='double_quotes' className='w-[42.6px] h-[27.6px] object-contain' />
    <p className='font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10'>
      {content}
    </p>

    <div className='flex flex-row'>
      <img src={img} alt={name} className='w-[48px] h-[48px] rounded-full' />
      <div className='flex flex-col ml-4'>
        <h4 className='font-poppins font-semibold text-[20px] leading-[32px] text-white'>{name}</h4>
        <p className='font-poppins font-normal text-[16px] leading-[24px] text-dimWhite'>{title}</p>
      </div>
    </div>
  </div>
)

export const Testimonials = () => {
  return (
    <section
      id='integrations'
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}
    >
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40' />

      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={styles.heading2}>Ship with the best shipping companies</h2>
        <div className='w-full mt-6 md:mt-0'>
          <p className={`${styles.paragraph} text-white text-left max-w-[450px]`}>
            Integrate and ship with +180 local and international carriers in one dashboard, you can
            ship, track and manage the order until it is delivered to the customer.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]'>
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={styles.heading2}>
          Integrate with the best <br className='hidden sm:block' /> E-commerce platforms
        </h2>
        <div className='w-full mt-6 md:mt-0'>
          <p className={`${styles.paragraph} text-white text-left max-w-[450px]`}>
            Integrate your online store with OTO and ship your orders nationally and internationally
            with 180+ carriers.
          </p>
        </div>
      </div>
    </section>
  )
}
