import React, { useCallback, useEffect, useState } from "react";

import useAPI from "../../hooks/useApi";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import Modal from "../../components/Modal";
import {
  CardContainer, 
  Header, 
  ImageContainer, 
  Pagblock, 
  PaginateContainer, 
  Image, 
  UpdateButton, 
  UserButton,
  SearchBar,
  SearchTitle,
  SortContainer,
  Sort,
  SortButton,
} from "./style";
import { Button, Card, DefaultContainer, Input } from "../../share-style";
import { User, Form } from "../../types";
import { Link } from "react-router-dom";
import { Description } from "../ProfilePage/style";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { fetchTemplates, setPage, setSortType, setSearch } from "../../redux/slices/formSlice";
import { getUsersFromSubdivision } from "../../redux/slices/userSlice";
import { act } from "react-dom/test-utils";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isTemplatesLoading,
    pageTemplates: templates,
    page,
    pageCount,
    sortType,
    search,
  } = useSelector((state: RootState) => state.form);

  const { usersInDivision, activeUser } = useSelector((state: RootState) => state.user);
  const [selectedTemplate, setSelectedTemplate] = useState<null | Form>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (templates) return ;
    dispatch(fetchTemplates(false));
    console.log('activeUser', activeUser);
    const { subdivision } = activeUser ?? { subdivision: null };
    if (subdivision) {
      console.log('subdivision.id', subdivision.id);
      dispatch(getUsersFromSubdivision(subdivision.id))
    }
  }, [activeUser, dispatch, templates]);

  const handleClickForm = useCallback((form: Form) => {
    console.log(form);
    setIsOpen(true);
    setSelectedTemplate(form);
  }, []);

  console.log('usersInDivision', usersInDivision);

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
      <p>Поясняющий текст</p>
      <SearchBar>
        <SearchTitle>
          <span>Поиск</span>
          <Input
            autoFocus
            placeholder={'Параметры фильтрации...'}
            value={search}
            onInput={({ target }: any) => dispatch(setSearch(target.value))} 
          />
        </SearchTitle>
        <SortContainer>
          <span>Сортировка</span>
          <Sort>
            <SortButton
              selected={sortType === 'ALP'} onClick={() => dispatch(setSortType('ALP'))}
            >
              Алфавит
            </SortButton>
            <SortButton
              selected={sortType === 'POP'} onClick={() => dispatch(setSortType('POP'))}
            >
              Популярное
            </SortButton>
          </Sort>
        </SortContainer>
      </SearchBar>
      <CardContainer>
        {isTemplatesLoading && <p>Загрузка анкетирований...</p>}
        {templates && !isTemplatesLoading && templates
          .filter(template => template.name.toLowerCase().includes(search.toLowerCase()))
          .sort((template1, template2) => sortType === 'ALP' ? template2.name[0] > template1.name[0] ? -1 : 1 : template1.id - template2.id)
          .map(form => (
          <div key={form.id} onClick={() => handleClickForm(form)}>
            <ImageContainer>
              <Image src={form.image} alt={`image_${form.name}`} />
            </ImageContainer>
            <Card>
              <div>{form.name}</div>
              <div>
                {Array(form.rating).fill(0).map(_ => (
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#8987F8"><path d="M7.775 19.3 8.9 14.5l-3.725-3.225 4.9-.425L12 6.325l1.925 4.525 4.9.425L15.1 14.5l1.125 4.8L12 16.75Z"/></svg>
                ))}
              </div>
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
          {usersInDivision && usersInDivision.map(user => (
            <List.Item key={user.id} data={user}>
              <Link to={`/formTemplate/${selectedTemplate?.id}?about=${user.id}`}>
                <UserButton>
                  {user.username}
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
