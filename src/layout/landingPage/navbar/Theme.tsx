import styled from 'styled-components'

export const Nav = styled.nav`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: rgb(0 4 15 / var(--tw-bg-opacity));
`

export const Logo = styled.img`
  width: 124px;
  height: 32px;
`

export const NavList = styled.ul`
  display: none;

  @media (min-width: 576px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    list-style: none;
  }
`

export const NavListItem = styled.li<any>`
  font-family: 'Poppins', sans-serif;
  font-weight: normal;
  font-size: 16px;
  cursor: pointer;
  margin-right: ${({lastItem}) => (lastItem ? '0' : '10px')};
  color: ${({active}) => (active ? '#fff' : '#707070')};
`

export const NavToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;

  @media (min-width: 576px) {
    display: none;
  }
`

export const ToggleIcon = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  cursor: pointer;
`

export const Sidebar = styled.div<any>`
  display: ${({open}) => (open ? 'flex' : 'none')};
  position: absolute;
  top: 5rem;
  right: 0;
  margin: 16px;
  padding: 24px;
  min-width: 140px;
  background: linear-gradient(144.39deg, #ffffff -278.56%, #6d6d6d -78.47%, #11101d 91.61%);
  border-radius: 12px;
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  list-style: none;
`

export const SidebarListItem = styled.li<any>`
  font-family: 'Poppins', sans-serif;
  font-weight: medium;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: ${({lastItem}) => (lastItem ? '0' : '16px')};
  color: ${({active}) => (active ? '#fff' : 'rgba(255, 255, 255, 0.7);')};
`
