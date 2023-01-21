import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import LocalStorage from "../../services/LocalStorage";
import { User } from "../../types";
import { Wrapper, Header, Footer, Main, RightHeader } from "./style";

interface Props {
  children: React.ReactNode
}

/* 
  create read update delete
*/

const CommonPage: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { activeUser } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper>
      <Header>
        <Link to="/main" tabIndex={-1}>The forms</Link>
        {location.pathname !== "/users" && location.pathname !== '/sign' && (
          <RightHeader>
            <Link to="/main">
              Анкеты
            </Link>
            <Link to="/profile">
              Мой профиль({activeUser?.username})
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