import React from "react";
import CommonPage from "../../containers/CommonPage";
import { Link } from "react-router-dom";
import { DefaultContainer } from "../../share-style";
import List from "../../containers/List";
import useAPI from "../../hooks/useApi";
import { User } from "../../types";

interface Props {
  activeUser: User
}

const UsersSubdivision: React.FC<Props> = ({ activeUser }) => {
  const { isLoading, data } = useAPI<User[]>("get", `users?subdivision_id=${activeUser.subdivision_id}`, []);

  return (
    <CommonPage>
      <h1>Список вашего предприятия</h1>
      <List gap={20}>
        {isLoading && <p>Загрузка пользователей...</p>}
        {data && data.map(user => (
          <List.Item key={user.id} data={user}>
            <Link to={`/profile/${user.id}`}>
              <DefaultContainer>
                {user.name}
              </DefaultContainer>
            </Link>
          </List.Item>
        ))}
      </List>
    </CommonPage>
  )
};

export default UsersSubdivision;
