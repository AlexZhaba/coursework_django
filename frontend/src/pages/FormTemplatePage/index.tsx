import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";
import useAPI from "../../hooks/useApi";
import LocalStorage from "../../services/LocalStorage";
import { Button } from "../../share-style";
import { Form, StorageUser, User } from "../../types";
import { TextArea } from "../../share-style";

interface Props {
  activeUser: User;
}

interface FormData {
  about: string | null;
  user_id: string | null,
  form_template_id: string,
  answers: {
    [K: string]: string
  }
};

interface PostResponseAPI {
  form_id: number;
}

type DataFromFormProps = [
  FormData | null,
]

const FormTemplatePage: React.FC<Props> = ({ activeUser }) => {
  const { templateId } = useParams()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dataFromForm, setDataFromForm] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { isLoading, data } = useAPI<Form>("get", `forms/template?template_id=${templateId}`, []);

  const sendForm = useAPI<PostResponseAPI, DataFromFormProps>("post", `forms/`, [dataFromForm], {}, (deps) => !!deps[0]);

  useEffect(() => {
    if (!sendForm.data) return;
    navigate(`/form/${sendForm.data.form_id}`);
  }, [sendForm.data]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    const answers = [...document.getElementsByClassName("answers")] as HTMLTextAreaElement[];
    const formData: FormData = {
      about: searchParams.get("about"),
      user_id: String(LocalStorage.get<StorageUser>("activeUser")?.id),
      form_template_id: templateId as string,
      answers: {}
    };
    answers.forEach((answer) => {
      formData.answers[answer.id] = answer.value
    });
    // console.log(formData);
    sendForm.setRequestBody(formData); 
    setDataFromForm(formData);
  }

  return (
    <CommonPage>
      <h1>{data ? data.name : "Загрузка анкеты"}</h1>
      <form method="POST" onSubmit={onFormSubmit} ref={formRef}>
        <List gap={10}>
          {data && data.questions.map(question => (
            <List.Item key={question.id} data={question}>
              <p>{question.text}</p>
              <TextArea name="answers" id={`${question.id}`} className="answers" cols={30} rows={10}></TextArea>
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
