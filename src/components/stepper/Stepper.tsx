import React, {useEffect, useState} from 'react'
import {StepIndicator, TitleBody, NaveStepper, Tilte, StepperBody, Icon} from './Theme'

interface StepperProps {
  pages: any
  initialValue: any
}

export const Stepper = ({pages, initialValue}: StepperProps) => {
  const [activeTab, setActiveTab] = useState(initialValue)

  useEffect(() => {
    setActiveTab(initialValue)
  }, [initialValue])

  return (
    <>
      <div className='stepper stepper-links d-flex flex-column' id='kt_create_account_stepper'>
        <NaveStepper className='stepper-nav mb-5'>
          {pages?.map((item: any) => {
            const isActive = activeTab === item?.id
            const skiped = activeTab > item?.id
            return (
              <StepperBody {...{isActive, skiped}} key={item?.id} data-kt-stepper-element='nav'>
                <StepIndicator {...{isActive, skiped}}>
                  {skiped ? <Icon className='stepper-check fas fa-check'></Icon> : item?.id}
                </StepIndicator>
                <TitleBody {...{isActive, skiped}}>
                  <Tilte className=' m-0 p-0'>{item?.title}</Tilte>
                  {item?.text ? <p className=' m-0 p-0'>{item?.text}</p> : null}
                </TitleBody>
              </StepperBody>
            )
          })}
        </NaveStepper>
      </div>
    </>
  )
}
