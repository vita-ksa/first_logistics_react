import {KTCard, KTCardBody} from '_metronic/helpers'
import React, {Fragment} from 'react'
import {Helmet} from 'react-helmet-async'
import styled from 'styled-components'
import ComingSoon from 'assets/icons/comming-soon.svg'

export const Image = styled.img`
  --f: 0.1;
  --r: 10px;
  --_f: calc(100% * var(--f) / (1 + var(--f)));
  --_a: calc(90deg * var(--f));
  width: 500px;
  aspect-ratio: calc((1 + var(--f)));
  object-fit: cover;
  clip-path: inset(0 var(--_f) 0 0 round var(--r));
  transform: perspective(400px) var(--_t, rorateY(var(--_a)));
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    clip-path: inset(0 0 0 var(--_f) round var(--r));
    --_t: translateX(calc(-1 * var(--_f))) rotateY(calc(-1 * var(--_a)));
  }
`

export const Dashboard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className='w-100'>
        <KTCard>
          <KTCardBody className='d-flex justify-content-center align-content-center'>
            <Image src={ComingSoon} alt='coming soon' />
          </KTCardBody>
        </KTCard>
      </div>
    </Fragment>
  )
}
