import React, { useEffect } from "react";
import { Wrapper, Body } from "./style";

interface ChildProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: Function;
}

const Modal: React.FC<ChildProps> = ({ isOpen, onClose, children }) => {

  useEffect(() => {

  }, []);

  return (
    <Wrapper isOpen={isOpen} onClick={onClose as React.MouseEventHandler<HTMLDivElement>}>
      <Body onClick={event => event.stopPropagation()}>
        {children}
      </Body>
    </Wrapper>
  );
};

export default Modal;
