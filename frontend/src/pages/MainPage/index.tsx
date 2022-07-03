import React, { useCallback, useState } from "react";
import useAPI from "../../hooks/useApi";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import Modal from "../../components/Modal";
import { UserButton } from "./style";
import { DefaultContainer } from "../../share-style";
import { User, Form } from "../../types";
import { Link } from "react-router-dom";
interface Props {
  activeUser: User
}

const MainPage: React.FC<Props> = ({ activeUser }) => {
  const { isLoading, data } = useAPI<Form[]>("get", "forms/template", []);
  const usersInDivision = useAPI<User[]>("get", `users?subdivision_id=${activeUser.subdivision_id}`, [])
  const [selectedTemplate, setSelectedTemplate] = useState<null | Form>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickForm = useCallback((form: Form) => {
    console.log(form);
    setIsOpen(true);
    setSelectedTemplate(form);
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{textAlign: "center"}}>Выбрать пользователя</h2>
        <List gap={10} overflowtype="scroll">
          {usersInDivision.data && usersInDivision.data.map(user => (
            <List.Item key={user.id} data={user}>
              <Link to={`/formTemplate/${selectedTemplate?.id}?about=${user.id}`}>
                <UserButton>
                  {user.name}
                </UserButton>
              </Link>
            </List.Item>
          ))}
        </List>
      </Modal>
    </CommonPage>
  );
};

export default MainPage;
