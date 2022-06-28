import React, { useEffect } from "react";

import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import useAPI from "../../hooks/useApi";
import { DefaultContainer } from "../../share-style";

interface UsersProps {
  id: number;
  name: string;
  subdivision_id: number;
}

const UsersPage: React.FC = () => {
  const {isLoading, data } = useAPI<UsersProps[]>("get", "users");

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <CommonPage>
      <h1>Выбор пользователя</h1>
      <List gap={20}>
        {data && data.map(user => (
          <List.Item>
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
