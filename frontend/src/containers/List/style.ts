import styled from "styled-components";

interface Props {
  overflowtype?: "scroll" | "hidden";
}

export const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${props => props.overflowtype && `overflow: ${props.overflowtype}`}
`;

interface ItemProps {
  gap: number;
}

export const ListItem = styled.div<ItemProps>`
  margin-bottom: ${props => props.gap}px;
  max-width: 100%;

  &:last-child {
    margin-bottom: 0px;
  }
`;