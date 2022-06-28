import React from "react";
import { Wrapper, Header, Footer, Main } from "./style";

interface Props {
  children: React.ReactNode
}

const CommonPage: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <Header>
      The forms
    </Header>
    <Main>
      {children}
    </Main>
    <Footer>
      Жаворонков Александр Арсеньевич, 211-321, 2022
    </Footer>
  </Wrapper>
);

export default CommonPage;