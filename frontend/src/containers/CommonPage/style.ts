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
  /* height: 60px; */
  padding: 10px 0;
  background: #8987F8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  text-transform: uppercase;
  color: #FFF;
  position: relative;

  & a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const Main = styled.main`
  width: calc(100vw);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 0 100px;
  padding-bottom: 100px;
  & h1 {
    font-size: 30px;
    /* font-weight: normal; */

    @media (max-width: 1100px) {
      font-size: 24px;
    }

    @media (max-width: 700px) {
      font-size: 18px;
    }
  }

  @media (max-width: 1100px) {
    padding: 0 60px;
    /* width: calc(100vw - 120px); */
  }

  @media (max-width: 700px) {
    padding: 0 30px;
    /* width: calc(100vw - 60px); */
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
  text-align: center;

  @media (max-width: 700px) {
    font-size: 13px;
  }
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 100px;
  font-size: 15px;
  text-transform: none;
  display: flex;
  gap: 15px;

  & > a {
    text-align: center;
  }

  @media (max-width: 1100px) {
    position: relative;
    right: 0;
  }

  @media (max-width: 700px) {
    position: relative;
    right: 0;
    flex-direction: column;
  }
`;