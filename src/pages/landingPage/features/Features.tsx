import React from 'react'
import styles, {layout} from '../style'
import {features} from 'constants/landing-data'
import robot from 'assets/icons/default-small.svg'

const FeatureCard = ({icon, title, content, index}: any) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] ${
      index !== features.length - 1 ? 'mb-6' : 'mb-0'
    } feature-card`}
  >
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt='star' className='w-[50%] h-[50%] object-contain' />
    </div>
    <div className='flex flex-col flex-1 ml-3'>
      <h4 className='font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1'>
        {title}
      </h4>
      <p className='font-poppins font-normal text-dimWhite text-[16px] leading-[24px]'>{content}</p>
    </div>
  </div>
)

export const Features = () => {
  return (
    <section id='features' className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Deliver shipments on time with
          <span className='text-gradient'>less effort</span> and higher accuracy.
        </h2>
        <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
          Whether you are a small retailer, enterprise, or online store owner, OTO helps you level
          up your shipping experience by enabling you to integrate with +180 shipping carriers,
          automate the whole delivery process, and generate labels in a few clicks.
        </p>

        {/* <Button styles={`mt-10`} /> */}
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {/* {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))} */}

        <img src={robot} alt='billing' className='w-[100%] h-[100%] relative z-[5]' />
      </div>
    </section>
  )
}
