import styled from "styled-components";

export const DefaultContainer = styled.button`
  height: 60px;
  width: 400px;
  border: 2px solid #8987F8;
  border-radius: 10px;
  background: #FFF;
  font-size: 24px;

  &:hover {
    background: #EEE;
    cursor: pointer;
  }

  &:active {
    background: #DDD;
  }
`;

export const Button = styled.button`
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
  border-radius: 5px;

  &:hover {
    background: #8080F8;
    transition: .3s all;
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid #8987F8;
  height: 100px;
  width: 500px;
  font-family: 'Raleway', sans-serif;
  outline: none;
`;