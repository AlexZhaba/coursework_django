import React, { useCallback } from "react";
import useAPI from "../../hooks/useApi";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import { DefaultContainer } from "../../share-style";
import { User, Form } from "../../types";
interface Props {
  activeUser: User
}

const MainPage: React.FC<Props> = ({ activeUser }) => {
  const { isLoading, data } = useAPI<Form[]>("get", "forms");

  const handleClickForm = useCallback((form: Form) => {
    console.log(form);
  }, []);

  return (
    <CommonPage>
      <h1>Пройти анкетирование</h1>
      <List gap={20}>
        {isLoading && <p>Загрузка анкетирований...</p>}
        {data && data.map(form => (
          <List.Item key={form.id} onClick={handleClickForm} data={form}>
            <DefaultContainer>
              {form.name}
            </DefaultContainer>
          </List.Item>
        ))}
      </List>
    </CommonPage>
  );
};

export default MainPage;
