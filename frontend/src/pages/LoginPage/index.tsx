import React, { useCallback, useId } from "react";
import CommonPage from "../../containers/CommonPage";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { userLogin } from "../../redux/slices/userSlice";
import { Button, Input } from "../../share-style";

import { FormWrapper, Label, Title, Wrapper, InputContainer } from './style';
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

export const LoginPage: React.FC = () => {
  const usernameId = useId();
  const passwordId = useId();

  const { isLoading, activeUser } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleOnSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    console.log('event', event);
    event.preventDefault();

    const { value: username } = document.getElementById(usernameId) as HTMLInputElement;
    const { value: password } = document.getElementById(passwordId) as HTMLInputElement;

    dispatch(userLogin({
      username,
      password,
    }))

  }, [dispatch, passwordId, usernameId]);

  if (activeUser) {
    console.log('activeUser', activeUser);
      return (
      <Navigate to={'/forms'} />
    )
  }

  return (
    <CommonPage>
      <Wrapper>
        <FormWrapper onSubmit={handleOnSubmit}>
          <Title>Вход</Title>
          <InputContainer>
            <Label htmlFor={usernameId}>Логин</Label>
            <Input id={usernameId} autoFocus={true} type="text" placeholder="" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={passwordId}>Пароль</Label>
            <Input id={passwordId} type="password" />
          </InputContainer>
          <Button isLoading={isLoading}>Войти</Button>
        </FormWrapper>
      </Wrapper>
    </CommonPage>
  )
}