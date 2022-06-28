import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import LocalStorage from "../../services/LocalStorage";
import useAPI from "../../hooks/useApi";
import { DefaultContainer } from "../../share-style";
import { User } from "../../types";

interface Props {
  setActiveUser: Function;
}

const UsersPage: React.FC<Props> = ({ setActiveUser }) => {
  const { isLoading, data } = useAPI<User[]>("get", "users");
  const navigate = useNavigate();

  const handleSelectUser = useCallback((user: User) => {
    LocalStorage.set("activeUser", user);
    setActiveUser(user);
    navigate("/profile");
  }, []);

  return (
    <CommonPage>
      <h1>Выбор пользователя</h1>
      <List gap={20}>
        {isLoading && <p>Загрузка пользователей...</p>}
        {data && data.map(user => (
          <List.Item key={user.id} onClick={handleSelectUser} data={user}>
            <DefaultContainer>
              {user.name}
            </DefaultContainer>
          </List.Item>
        ))}
      </List>
    </CommonPage>
  )
};

export default UsersPage;
