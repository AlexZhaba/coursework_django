import styled from "styled-components";

interface WrapperProps {
  isOpen: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  visibility: visible;
  opacity: 1;
  transition: .3s all;

  & > div {
    transform: scale(1);
  }

  ${props => !props.isOpen && `
    visibility: hidden;
    opacity: 0;
    cursor: default;
    & > div {
      transform: scale(0.9);
    }
  `}
`;

export const Body = styled.div`
  width: 300px;
  max-width: calc(100vw - 20px);
  height: 300px;
  background: #FFF;
  cursor: default;
  transition: .3s all;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;


  @media(max-width: 700px) {
    /* height: 100vh; */
    /* border-radius: 0px; */
  }
`;