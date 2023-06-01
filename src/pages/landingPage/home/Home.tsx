import React from 'react'
import styles from '../style'
import arrowUp from 'assets/icons/arrow-up.svg'
import robot from 'assets/icons/default-small.svg'
import {Link} from 'react-router-dom'

const GetStarted = () => (
  <Link to='/auth/login'>
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-gradient-to-r  w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
            <span className='text-gradient'>Get</span>
          </p>
          <img src={arrowUp} alt='arrow-up' className='w-[23px] h-[23px] object-contain' />
        </div>

        <p className='font-poppins font-medium text-[18px] leading-[23.4px]'>
          <span className='text-gradient'>Started</span>
        </p>
      </div>
    </div>
  </Link>
)

export const Home = () => {
  return (
    <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        {/* <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
          <img src={discount} alt='discount' className='w-[32px] h-[32px]' />
          <p className={`${styles.paragraph} ml-2`}>
            <span className='text-white'>20%</span> Discount For
            <span className='text-white'>1 Month</span> Account
          </p>
        </div> */}

        <div className='flex flex-row items-center justify-between w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
            The First <br className='hidden sm:block' />
            <span className='text-gradient'>Logistics</span>
          </h1>
          <div className='hidden mr-0 ss:flex md:mr-4'>
            <GetStarted />
          </div>
        </div>

        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full'>
          Everything you need to ship <strong className='text-gradient'>better</strong>
        </h1>
        <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
          MENA’s #1 shipping gateway for e-commerce stores and retailers to ship, manage, track,
          analyze and return orders with 180+ carriers from a single dashboard.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt='billing' className='w-[100%] h-[100%] relative z-[5]' />

        {/* gradient start */}
        <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
        <div className='absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40' />
        <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  )
}
