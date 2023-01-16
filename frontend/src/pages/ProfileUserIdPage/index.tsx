import React, { useMemo } from "react";
import { useParams } from "react-router";
import CommonPage from "../../containers/CommonPage";
import ProfilePage from "../ProfilePage";
import ProfileReflection from "../../components/ProfileReflection";
import { TopProfile, Title } from "../ProfilePage/style";
import useAPI from "../../hooks/useApi";
import { User } from "../../types";

const ProfileUserIdPage: React.FC = () => {
  const { profileId } = useParams();
  const { data } = useAPI<User>("get", `users?id=${profileId}`, []);

  if (!data) return (
    <CommonPage>
      <TopProfile>
        <h1>Профиль: -</h1>
      </TopProfile>
      <Title>Список пройденных анкетирований по пользователям</Title>
    </CommonPage>
  )

  return (
    <ProfilePage />
  )
};

export default ProfileUserIdPage;
