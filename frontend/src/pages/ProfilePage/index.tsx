import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormWithAnswers, User, UserForms } from "../../types";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import LocalStorage from "../../services/LocalStorage";
import { DefaultContainer } from "../../share-style";
import { TopProfile, ExitSpan, UserName, Title } from "./style";
import useAPI from "../../hooks/useApi";
import ProfileReflection from "../../components/ProfileReflection";

interface Props {
  activeUser: User;
  setActiveUser?: Function;
}

const ProfilePage: React.FC<Props> = ({ activeUser, setActiveUser }) => {
  const navigate = useNavigate();
  const { isLoading, data, error } = useAPI<FormWithAnswers[]>("get", `forms?user_id=${activeUser.id}`, []);

  const onExit = () => {
    LocalStorage.set("activeUser", null);
    if (setActiveUser) setActiveUser(null);
    navigate("/users");
  };

  const parsedData = useMemo(() => {
    if (!data) return null;
    const user_forms: UserForms = {};
    data.forEach((form) => {
      if (!user_forms[form.about_user.name]) {
        user_forms[form.about_user.name] = []
      }
      user_forms[form.about_user.name].push(form);
    });
    return user_forms;
  }, [data]);

  return (
    <CommonPage>
      <TopProfile>
        <h1>Профиль: {activeUser.name}</h1>
        {setActiveUser && <ExitSpan onClick={onExit}>Выйти</ExitSpan>}
      </TopProfile>
      <Title>Список пройденных анкетирований по пользователям</Title>
      <ProfileReflection profileData={parsedData} />
        {error && <div>Пока пусто</div>}
    </CommonPage>
  );
};

export default ProfilePage;

