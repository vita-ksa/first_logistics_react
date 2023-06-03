import styled, {css} from 'styled-components'

export const StepIndicator = styled.div<any>`
  text-decoration: none;
  width: 35px;
  height: 35px;
  background: #e8e8e9;
  color: #000000;
  border-radius: ${(props) => (props?.skiped ? '50px' : '4px')};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  user-select: none;
  position: relative;
  font-weight: bold;
  font-size: 18px;
  margin-inline-end: 10px;
  transition: all 600ms ease-in-out;
  ${(props) =>
    props.isActive || props.skiped
      ? css`
          background: var(--kt-dark);
          color: #fff;
        `
      : ``}
`

export const StepperBody = styled.div<any>`
  display: flex;
  align-items: center;
  /* margin: 1rem auto 1rem 0 !important; */
  padding: 16px;
  flex: 1 1 auto;
  border-radius: 16px 16px 0px 0px;
  ${(props) =>
    props.isActive || props.skiped
      ? css`
          background: #ffffff;
        `
      : css`
          background: #f2f2f2;
        `}
`

export const NaveStepper = styled.div`
  margin: 0 !important;
  justify-content: flex-start !important;
  & > div:not(:last-child) {
    margin: 0 5px 0 0 !important;
  }
`

export const Tilte = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
`
export const TitleBody = styled.div<any>`
  transition: all 600ms ease-in-out;
  ${(props) =>
    props.isActive
      ? css`
          color: #000000;
        `
      : css`
          color: #464e5f;
        `}
`

export const Icon = styled.i`
  &:before {
    color: #ffffff;
    font-size: 22px;
  }
`
