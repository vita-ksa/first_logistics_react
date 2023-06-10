import React from 'react'
import {motion} from 'framer-motion'
import {landingAnimations} from 'constants/animations'
import styles from '../style'
import {StartButton} from '../startButton'
import styled from 'styled-components'
import robot from 'assets/icons/default-small.svg'

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  padding: 100px 0;
  flex-direction: column;
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`

const TaitleBody = styled.div``
const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
  line-height: 52px;
`

const StyledText = styled.div`
  flex: 1;
  padding: 20px;
  margin-bottom: 20px;
`

const Paragraph = styled.p`
  flex: 1;
  max-width: 100%;
  margin: 0% 28% -1% 28%;
  font-size: 18px;
  text-align: center;
  font-weight: 500;
`

export const Integrations = () => {
  return (
    <motion.div
      variants={landingAnimations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{duration: 1}}
      className='bg-secondary-100 text-secondary-200'
    >
      <StyledSection>
        <TaitleBody>
          <Title>Ship with the best shipping companies</Title>
        </TaitleBody>
        <StyledText>
          <Paragraph>
            Integrate and ship with +180 local and international carriers in one dashboard, you can
            ship, track and manage the order until it is delivered to the customer.
          </Paragraph>
        </StyledText>
        <StartButton />
      </StyledSection>
      <section className='showcase'>
        <div className='container'>
          <div className='showcase__container'>
            <div className='showcase__text'>
              <h1 className='showcase__title'>Integrate with the best E-commerce platforms</h1>
              <p className='showcase__paragraph'>
                Integrate your online store with OTO and ship your orders nationally and
                internationally with 180+ carriers.
              </p>
              <a href='#' className='showcase__button'>
                Start For Free
              </a>
            </div>
            <div className='showcase__image-wrapper'>
              <img
                className='showcase__image'
                src={
                  'https://tryoto.com/wp-content/uploads/2023/02/svgviewer-output-2023-02-16T144232.621.svg'
                }
                alt='rr'
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
