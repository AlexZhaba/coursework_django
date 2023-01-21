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
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { fetchTemplateWithId, saveForm } from "../../redux/slices/formSlice";

export interface FormData {
  about_user_id: number | null;
  user_id: number | null,
  form_template_id: number,
  answers: {
    question_id: number;
    text: string;
  }[];
};

interface PostResponseAPI {
  form_id: number;
}

type DataFromFormProps = [
  FormData | null,
]

const FormTemplatePage: React.FC = () => {
  const { templateId } = useParams()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [dataFromForm, setDataFromForm] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  // const { isLoading, data } = useAPI<Form>("get", `forms/template?template_id=${templateId}`, []);
  const { activeTemplate, isTemplatesLoading, activeForm } = useSelector((state: RootState) => state.form);
  const { activeUser } = useSelector((state: RootState) => state.user);

  // const sendForm = useAPI<PostResponseAPI, DataFromFormProps>("post", `forms/`, [dataFromForm], {}, (deps) => !!deps[0]);

  useEffect(() => {
    console.log('activeForm', activeForm);
    if (!activeForm) return;
    navigate(`/form/${activeForm.id}`);
  }, [navigate, activeForm, isTemplatesLoading]);

  useEffect(() => {
    if (templateId) dispatch(fetchTemplateWithId(Number(templateId)));
  }, [dispatch, templateId]);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;
    /*
      {
        "form_template_id": 2,
        "user_id": 1,
        "about_user_id": 2,
        "answers": [
            {
                "text": "ANSWER_1",
                "question_id": "1"
            },
            {
                "text": "ANSWER_1",
                "question_id": "1"
            }
        ]
    }
    */
    const answers = [...document.getElementsByClassName("answers")] as HTMLTextAreaElement[];
    const formData: FormData = {
      about_user_id: Number(searchParams.get("about")),
      user_id: Number(activeUser?.id),
      form_template_id: Number(templateId),
      answers: answers.map(el => ({
        question_id: Number(el.id),
        text: el.value,
      })),
    };
    // answers.forEach((answer) => {
    //   formData.answers[answer.id] = answer.value
    // });
    // console.log(formData);
    // sendForm.setRequestBody(formData); 
    // setDataFromForm(formData);
    dispatch(saveForm(formData));
  }

  console.log('activeTemplate', activeTemplate);

  return (
    <CommonPage>
      <h1>{activeTemplate ? activeTemplate.name : "Загрузка анкеты"}</h1>
      <form method="POST" onSubmit={onFormSubmit} ref={formRef}>
        <List gap={10}>
          {activeTemplate && activeTemplate.questions.map(question => (
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
