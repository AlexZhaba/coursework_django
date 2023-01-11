import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding-top: 100px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;

export const FormWrapper = styled.form`
  max-width: calc(100vw - 60px);
  width: 400px;

  box-shadow: 0px 0px 30px #ccc;
  padding: 20px 40px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  display: inline-block;
`;