import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ItemProps {
  gap: number;
}

export const ListItem = styled.div<ItemProps>`
  margin-bottom: ${props => props.gap}px;

  &:last-child {
    margin-bottom: 0px;
  }
`;