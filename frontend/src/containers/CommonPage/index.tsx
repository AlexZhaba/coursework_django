import React from "react";
import { Link } from "react-router-dom";
import { Wrapper, Header, Footer, Main } from "./style";

interface Props {
  children: React.ReactNode
}

const CommonPage: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <Header>
      <Link to="/main">The forms</Link>
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