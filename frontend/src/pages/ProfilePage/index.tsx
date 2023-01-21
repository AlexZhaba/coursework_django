import React, { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormWithAnswers, User, UserForms } from "../../types";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import LocalStorage from "../../services/LocalStorage";
import { DefaultContainer } from "../../share-style";
import { TopProfile, ExitSpan, UserName, Title } from "./style";
import useAPI from "../../hooks/useApi";
import ProfileReflection from "../../components/ProfileReflection";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { fetchForms } from "../../redux/slices/formSlice";
import { logout } from "../../redux/slices/userSlice";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { activeUser } = useSelector((state: RootState) => state.user);
  const { myForms } = useSelector((state: RootState) => state.form);
  // const { isLoading, data, error } = useAPI<FormWithAnswers[]>("get", `forms?user_id=${activeUser?.id}`, []);

  const onExit = () => {
    LocalStorage.set("activeUser", null);
    LocalStorage.set('token', null);
    // if (setActiveUser) setActiveUser(null);
    dispatch(logout());
    navigate("/users");
  };

  useEffect(() => {
    dispatch(fetchForms())
  }, [dispatch]);

  console.log(activeUser);

  // const parsedData = useMemo(() => {
  //   if (!data) return null;
  //   const user_forms: UserForms = {};
  //   data.forEach((form) => {
  //     if (!user_forms[form.about_user.name]) {
  //       user_forms[form.about_user.name] = []
  //     }
  //     user_forms[form.about_user.name].push(form);
  //   });
  //   return user_forms;
  // }, [data]);

  return (
    <CommonPage>
      <TopProfile>
        <h1>Профиль: {activeUser?.username}</h1>
        <ExitSpan onClick={onExit}>Выйти</ExitSpan>
      </TopProfile>
      <Title>Список пройденных анкетирований по пользователям</Title>
      <ProfileReflection myForms={myForms} />
        {/* {error && <div>Пока пусто</div>} */}
    </CommonPage>
  );
};

export default ProfilePage;

