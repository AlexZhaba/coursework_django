import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router';

import useAPI from "../../hooks/useApi";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import Modal from "../../components/Modal";
import { CardContainer, Header, ImageContainer, Pagblock, PaginateContainer, Image, UpdateButton, UserButton } from "./style";
import { Button, Card, DefaultContainer } from "../../share-style";
import { User, Form } from "../../types";
import { Link } from "react-router-dom";
import { Description } from "../ProfilePage/style";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { fetchTemplates, setPage, } from "../../redux/slices/formSlice";
interface Props {
  activeUser: User
}

const MainPage: React.FC<Props> = ({ activeUser }) => {
  const dispatch = useAppDispatch();
  const {
    isTemplatesLoading,
    pageTemplates: templates,
    page,
    pageCount,
  } = useSelector((state: RootState) => state.form);

  const usersInDivision = useAPI<User[]>("get", `users?subdivision_id=${activeUser.subdivision_id}`, [])
  const [selectedTemplate, setSelectedTemplate] = useState<null | Form>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (templates) return 
    dispatch(fetchTemplates(false))
  }, [dispatch, templates]);

  const handleClickForm = useCallback((form: Form) => {
    console.log(form);
    setIsOpen(true);
    setSelectedTemplate(form);
  }, []);

  return (
    <CommonPage>
      <Header>
        <h1>Пройти анкетирование</h1>
        <UpdateButton
          isLoading={isTemplatesLoading}
          onClick={() => dispatch(fetchTemplates(true))}
        >
          Обновить
        </UpdateButton>
      </Header>
      <CardContainer>
        {isTemplatesLoading && <p>Загрузка анкетирований...</p>}
        {templates && !isTemplatesLoading && templates.map(form => (
          <div key={form.id} onClick={() => handleClickForm(form)}>
            <ImageContainer>
              <Image src={form.image} alt="" />
            </ImageContainer>
            <Card>
              <div>{form.name}</div>
              <Description>{form.description}</Description>
            </Card>
          </div>
        ))}
      </CardContainer>
      {!isTemplatesLoading && (
        <PaginateContainer>
          {Array(pageCount).fill(0).map((_, index) => (
            <Pagblock active={index + 1 === page} onClick={() => dispatch(setPage(index + 1))}>
              {index + 1}
            </Pagblock>
          ))}
        </PaginateContainer>
      )}
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
