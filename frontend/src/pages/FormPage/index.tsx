import React from "react";
import { useParams } from "react-router";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import useAPI from "../../hooks/useApi";
import { FormWithAnswers, User } from "../../types";
import { TextArea } from "../../share-style";

interface Props {
  activeUser: User;
}

const FormPage: React.FC<Props> = ({ activeUser }) => {
  const { formId } = useParams()
  const { data } = useAPI<FormWithAnswers>("get", `forms?id=${formId}`, []);
  console.log(data);
  return (
    <CommonPage>
      <h1>{data ? data.name : "Загрузка анкеты"}</h1>
      {data && <span>Пройдено пользователем: <strong>{data.user.name}</strong></span>}
      {data && <span>Анкетирование о пользователе: <strong>{data.about_user.name}</strong></span>}
      <List gap={10}>
        {data && data.questions.map(question => (
          <List.Item key={question.id} data={question}>
            <p>{question.text}</p>
            <TextArea name="answers" id={`${question.id}`} className="answers" cols={30} rows={10} readOnly value={question.answer.text}></TextArea>
          </List.Item>
        ))}
      </List>
    </CommonPage>
  )
};

export default FormPage;