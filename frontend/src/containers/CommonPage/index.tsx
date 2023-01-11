import React from "react";
import { Link, useLocation } from "react-router-dom";
import LocalStorage from "../../services/LocalStorage";
import { User } from "../../types";
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
        <Link to="/main" tabIndex={-1}>The forms</Link>
        {location.pathname !== "/users" && location.pathname !== '/sign' && (
          <RightHeader>
            <Link to="/main">
              Анкеты
            </Link>
            <Link to="/userssubdivision">
              Список подразделения
            </Link>
            <Link to="/profile">
              Мой профиль({LocalStorage.get<User>('activeUser')?.name})
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