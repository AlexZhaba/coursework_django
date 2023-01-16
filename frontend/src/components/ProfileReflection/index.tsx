import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import List from "../../containers/List";
import { UserForms } from "../../types";
import { DefaultContainer } from "../../share-style";
import { UserName } from "./style";
import { FormWithAnswers } from "../../models/templateWithAnswers";

interface Props {
  myForms: FormWithAnswers[];
}

const ProfileReflection: React.FC<Props> = ({ myForms }) => {
  
  const parsedForms = useMemo(() => myForms.reduce((res, form) => {
    res[form.user.username] = res[form.user.username] ? [...res[form.user.username], form] : [form];
    return res;
  }, {} as Record<string, FormWithAnswers[]>), [myForms])
  
  if (!myForms) return <div></div>;

  return (
    <List gap={0}>
      {parsedForms && Object.keys(parsedForms).map(name => (
        <List.Item key={name} data={name}>
          <UserName>{name}</UserName>
          <List gap={10}>
          {parsedForms[name].map(form => (
            <List.Item key={form.id} data={form}>
              <Link to={`/form/${form.id}`}>
                <DefaultContainer>
                  {form.form_template.name}
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
