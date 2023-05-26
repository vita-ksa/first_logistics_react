import styled from 'styled-components';

export const Body = styled.div<any>`
    background-color: rgba(0, 0, 0, 0.52);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 555555;
    display: flex;
    justify-content: center;
    opacity: ${({ opacity }) => opacity};
    display: ${(props) => (props.open ? 'flex' : 'none')};
    transition: all 0.2s ease !important;
`;
