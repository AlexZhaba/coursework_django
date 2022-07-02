import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto 1fr auto;
  background: #FFF;
  font-family: 'Raleway', sans-serif;
`;

export const Header = styled.header`
  width: 100%;
  height: 60px;
  background: #8987F8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
  color: #FFF;
  position: relative;

  & a {
    color: inherit;
    text-decoration: none;
  }
`;

export const Main = styled.main`
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 0 100px;
  padding-bottom: 100px;
  & h1 {
    font-size: 30px;
    /* font-weight: normal; */
  }
`;

export const Footer = styled.footer`
  width: 100%;
  height: 60px;
  background: #8987F8;
  color: #FFF;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 100px;
  font-size: 15px;
  text-transform: none;
  display: flex;
  gap: 15px;
`;