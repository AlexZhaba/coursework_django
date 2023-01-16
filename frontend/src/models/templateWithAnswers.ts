import type { User } from './user';

export interface FormWithAnswers {
  form_template: {
      name: string,
      questions: {
          text: string,
          id: number,
      }[],
      id: number,
      description: string,
      image: string,
  },
  about_user: User,
  user: User,
  id: number,
  answer: {
    text: string,
    question: number,
    form: number
  }[],
  // [
  //     {
  //         "text": "Vtoroi",
  //         "question": 1,
  //         "form": 51
  //     },
  //     {
  //         "text": "Sowhat",
  //         "question": 2,
  //         "form": 51
  //     }
  // ]
}