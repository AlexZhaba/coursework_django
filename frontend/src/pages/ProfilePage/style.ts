import styled from "styled-components";

export const TopProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ExitSpan = styled.span`
  color: red;
  cursor: pointer;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const Title = styled.span`
  font-size: 23px;

  @media (max-width: 1100px) {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 17px;
  }
`;