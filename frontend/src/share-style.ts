import styled from "styled-components";

export const DefaultContainer = styled.button`
  /* height: 60px; */
  width: 400px;
  max-width: 100%;
  border: 2px solid #8987F8;
  border-radius: 10px;
  background: #FFF;
  font-size: 24px;
  padding: 10px 0;

  &:hover {
    background: #EEE;
    cursor: pointer;
  }

  &:active {
    background: #DDD;
  }

  @media (max-width: 1100px) {
    font-size: 20px;
    padding: 6px 0;
  }

  @media (max-width: 700px) {
    font-size: 16px;
    padding: 3px 0;
  }
`;

export const Card = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 15px 30px;
  border-radius: 4px;
  font-size: 25px;

  box-shadow: 0px 0px 30px #ccc;
`;

interface ButtonProps {
  isLoading?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: #8987F8;
  color: #FFF;
  width: 150px;
  height: 40px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s all;
  margin: 20px 0;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  position: relative;

  &:hover {
    background: #7777f9;
  }

  &:focus {
    background: #5a5aed;
    transform: scale(0.97);
  }

  ${props => props.isLoading && `
    &::before {
      z-index: 1;
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, .4);
      cursor: not-allowed;
      font-size: 40px;
      border-radius: 5px;
      
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 5px;
    }
  `}
`;

export const TextArea = styled.textarea`
  border: 1px solid #8987F8;
  height: 100px;
  width: 500px;
  font-family: 'Raleway', sans-serif;
  outline: none;
  max-width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 10px;
  border-radius: 6px;

  outline: none;
  border: none;

  box-shadow: 0px 0px 0px 1px var(--primary-color);
  transition: .2s box-shadow;

  font-size: 20px;

  &:focus {
    box-shadow: 0px 0px 0px 2px var(--primary-color);
  }
`;