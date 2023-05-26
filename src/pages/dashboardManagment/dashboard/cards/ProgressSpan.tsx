import React from 'react'
import { ReactComponent as UpSVG } from 'assets/icons/up_progress.svg'
import { ReactComponent as DownSVG } from 'assets/icons/down_progress.svg'

export const ProgressSpan = ({
  isUp,
  progress,
  fontSize = 3,
  children,
  svgWidth = '27px',
  svgHeight = '20px',
}: {
  isUp: boolean
  progress: string
  fontSize?: number
  children?: JSX.Element
  svgWidth?: string
  svgHeight?: string
}) => {
  return (
    <div className='progress-card d-flex'>
      {isUp ? (
        <UpSVG width={svgWidth} height={svgHeight} />
      ) : (
        <DownSVG width={svgWidth} height={svgHeight} />
      )}
      <div className='ms-3'>
        <span className={` fs-${fontSize} fw-bold`} style={{ color: isUp ? '#28A4C1' : '#FD17A9' }}>
          {progress}
        </span>
        {children && <div>{children}</div>}
      </div>
    </div>
  )
}
