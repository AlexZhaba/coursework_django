import React, { useRef } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import useAPI from "../../hooks/useApi";
import { Button } from "../../share-style";
import { Form, User } from "../../types";
import { TextArea } from "./style";

interface Props {
  activeUser: User;
}

const FormTemplatePage: React.FC<Props> = ({ activeUser }) => {
  const { templateId } = useParams()
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { isLoading, data } = useAPI<Form>("get", `forms/template?template_id=${templateId}`)
  // {templateId}{searchParams.get("about")}

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(formRef.current.seria)
    event.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current)
    // console.log(formData.values);
  }

  return (
    <CommonPage>
      <h1>{data ? data.name : "Загрузка анкеты"}</h1>
      <form action="" method="POST" onSubmit={onFormSubmit} ref={formRef}>
        <List gap={10}>
          {data && data.questions.map(question => (
            <List.Item key={question.id} data={question}>
              <p>{question.text}</p>
              <TextArea name="answers" id={`${question.id}`} cols={30} rows={10}></TextArea>
            </List.Item>
          ))}
        </List>
        <Button>
          Отправить
        </Button>
      </form>
    </CommonPage>
  )
};

export default FormTemplatePage;
