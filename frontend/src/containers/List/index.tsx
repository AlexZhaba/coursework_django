import React, { useContext } from "react";
import { ListItem, Wrapper } from "./style";

const GapContext = React.createContext(0)

interface ChildProps {
  children: React.ReactNode;
}

interface Props extends ChildProps {
  gap: number;
}

const Item: React.FC<ChildProps> = ({ children }) => {
  const gap = useContext(GapContext);
  return (
    <ListItem gap={gap}>
      {children}
    </ListItem>
  )
}

const List: React.FC<Props> & { Item: React.FC<ChildProps> } = ({ children, gap }) => {
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