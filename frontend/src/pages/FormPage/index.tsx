import React, { useEffect } from "react";
import { useParams } from "react-router";
import CommonPage from "../../containers/CommonPage";
import List from "../../containers/List";

import { TextArea } from "../../share-style";
import { RootState, useAppDispatch } from "../../redux/store/store";
import { fetchForm } from "../../redux/slices/formSlice";
import { useSelector } from "react-redux";

const FormPage: React.FC = () => {
  const { formId } = useParams();
  const dispatch = useAppDispatch();
  const { activeForm } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    dispatch(fetchForm(Number(formId)))
  }, [dispatch, formId]);
  // console.log(data);

  return (
    <CommonPage>
      <h1>{activeForm ? activeForm.form_template.name : "Загрузка анкеты"}</h1>
      {activeForm?.user && <span>Пройдено пользователем: <strong>{activeForm.user.username}</strong></span>}
      {activeForm?.about_user && <span>Анкетирование о пользователе: <strong>{activeForm?.about_user.username}</strong></span>}
      <List gap={10}>
        {activeForm && activeForm.form_template.questions.map(question => (
          <List.Item key={question.id} data={question}>
            <p>{question.text}</p>
            <TextArea
              name="answers"
              id={`${question.id}`}
              className="answers"
              cols={30}
              rows={10} readOnly
              value={activeForm.answer.find(answer => answer.question === question.id)?.text || ''}
            >
              
              </TextArea>
          </List.Item>
        ))}
      </List>
      {/* <span style={{ marginBottom: 20 }}></span> */}
    </CommonPage>
  )
};

export default FormPage;