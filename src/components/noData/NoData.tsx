import React from 'react'
import {AddNewButton, Body, Text, Title} from './Theme'

interface INoData {
  title: string
  desc: string
  clickHandler: () => void
  buttonText: string
  Icon?: any
}

export const NoData = ({title, desc, clickHandler, buttonText, Icon}: INoData) => {
  return (
    <Body>
      {Icon ? <Icon /> : null}
      <Title>{title}</Title>
      <Text>{desc}</Text>
      {clickHandler && <AddNewButton onClick={clickHandler}>{buttonText}</AddNewButton>}
    </Body>
  )
}
