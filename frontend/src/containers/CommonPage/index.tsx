import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Wrapper, Header, Footer, Main, RightHeader } from "./style";

interface Props {
  children: React.ReactNode
}

const CommonPage: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  console.log(location);
  return (
    <Wrapper>
      <Header>
        <Link to="/main">The forms</Link>
        {location.pathname !== "/users" && (
          <RightHeader>
            <Link to="/main">
              Анкеты
            </Link>
            <Link to="/userssubdivision">
              Список подразделения
            </Link>
            <Link to="/profile">
              Мой профиль
            </Link>
          </RightHeader>
        )}
      </Header>
      <Main>
        {children}
      </Main>
      <Footer>
        Жаворонков Александр Арсеньевич, 211-321, 2022
      </Footer>
    </Wrapper>
  );
}
export default CommonPage;