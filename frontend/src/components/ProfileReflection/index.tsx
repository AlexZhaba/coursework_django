import React from "react";
import { Link } from "react-router-dom";
import List from "../../containers/List";
import { UserForms } from "../../types";
import { DefaultContainer } from "../../share-style";
import { UserName } from "./style";

interface Props {
  profileData: UserForms | null;
}

const ProfileReflection: React.FC<Props> = ({ profileData }) => {
  if (!profileData) return <div></div>;

  return (
    <List gap={20}>
      {profileData && Object.keys(profileData).map(name => (
        <List.Item key={name} data={name}>
          <UserName>{name}</UserName>
          <List gap={10}>
          {profileData[name].map(form => (
            <List.Item key={form.id} data={form}>
              <Link to={`/form/${form.id}`}>
                <DefaultContainer>
                  {form.name}
                </DefaultContainer>
              </Link>
            </List.Item>
          ))}
          </List>
        </List.Item>
      ))}
    </List>
  );
};

export default ProfileReflection;
