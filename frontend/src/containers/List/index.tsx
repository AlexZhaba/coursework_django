import React, { useContext } from "react";
import { ListItem, Wrapper } from "./style";

const GapContext = React.createContext(0)

interface ChildProps {
  children: React.ReactNode;
}

interface ItemProps extends ChildProps {
  onClick?: Function;
  key: number;
  data: any;
}

interface Props extends ChildProps {
  gap: number;
}

const Item: React.FC<ItemProps> = ({ children, onClick, data }) => {
  const gap = useContext(GapContext);
  return (
    <ListItem gap={gap} onClick={() => onClick ? onClick(data): null}>
      {children}
    </ListItem>
  )
}

const List: React.FC<Props> & { Item: React.FC<ItemProps> } = ({ children, gap }) => {
  return (
    <GapContext.Provider value={gap}>
      <Wrapper>
        {children}
      </Wrapper>
    </GapContext.Provider>
  );
}

List.Item = Item;

export default List;