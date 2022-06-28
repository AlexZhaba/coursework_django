import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import CommonPage from "../../containers/CommonPage";
import LocalStorage from "../../services/LocalStorage";
import { TopProfile, ExitSpan } from "./style";

interface Props {
  activeUser: User;
  setActiveUser: Function;
}

const ProfilePage: React.FC<Props> = ({ activeUser, setActiveUser }) => {
  const navigate = useNavigate();

  const onExit = () => {
    LocalStorage.set("activeUser", null);
    setActiveUser(null);
    navigate("/users");
  };

  return (
    <CommonPage>
      <TopProfile>
        <h1>Активный профиль: {activeUser.name}</h1>
        <ExitSpan onClick={onExit}>Выйти</ExitSpan>
      </TopProfile>
    </CommonPage>
  );
};

export default ProfilePage;

