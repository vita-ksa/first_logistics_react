import React from 'react'
import styles from '../style'
import arrowUp from 'assets/icons/arrow-up.svg'
import robot from 'assets/icons/default-small.svg'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Clients} from '../clients'
import {motion} from 'framer-motion'
import {landingAnimations} from 'constants/animations'

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  padding: 100px 0;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`

const StyledText = styled.div`
  flex: 1;
  padding: 20px;
`

const StyledImage = styled.img`
  flex: 1;
  max-width: 100%;
`

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
    <motion.div
      variants={landingAnimations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{duration: 1}}
    >
      <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  ss:leading-[100.8px] leading-[75px]'>
              The First <br className='hidden sm:block' />
              <span className='text-gradient'>Logistics</span>
            </h1>
            {/* <div className='hidden mr-0 ss:flex md:mr-4'>
              <GetStarted />
            </div> */}
          </div>

          <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px]  ss:leading-[100.8px] leading-[75px] w-full'>
            Everything you need to ship <strong className='text-gradient'>better</strong>
          </h1>
          <p className={`${styles.paragraph}  max-w-[470px] mt-5`}>
            MENA’s #1 shipping gateway for e-commerce stores and retailers to ship, manage, track,
            analyze and return orders with 180+ carriers from a single dashboard.
          </p>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <StyledImage src={robot} alt='billing' />
        </div>

        {/* <div className={`ss:hidden ${styles.flexCenter}`}>
          <GetStarted />
        </div> */}
      </section>

      <section id='section2'>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  ss:leading-[100.8px] leading-[75px]'>
              The First <br className='hidden sm:block' />
              <span className='text-gradient'>Logistics</span>
            </h1>
          </div>

          <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px]  ss:leading-[100.8px] leading-[75px] w-full'>
            Everything you need to ship <strong className='text-gradient'>better</strong>
          </h1>
          <p className={`${styles.paragraph}  max-w-[470px] mt-5`}>
            MENA’s #1 shipping gateway for e-commerce stores and retailers to ship, manage, track,
            analyze and return orders with 180+ carriers from a single dashboard.
          </p>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <StyledImage src={robot} alt='billing' />
        </div>
      </section>

      <h1>Empowering more than 8,000 sellers</h1>
      <Clients />
      <StyledSection id='section3'>
        <StyledText>
          <h2>Section 3</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </StyledText>
        <StyledImage src={robot} alt='Image 3' />
      </StyledSection>
    </motion.div>
  )
}
