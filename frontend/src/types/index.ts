interface User {
  id: number;
  name: string;
  subdivision_id: number;
}

interface Question {
  id: number;
  text: string;
}

interface Form {
  id: number;
  name: string;
  description: string;
  image: string;
  questions: Question[];
}

interface Answer {
  id: number;
  text: string
}

interface QuestionWithAsnwers extends Question {
  answer: Answer
}

interface FormWithAnswers {
  id: number;
  user: User;
  about_user: User;
  name: string;
  questions: QuestionWithAsnwers[];
}

type StorageUser = User | null;

interface UserForms {
  [K: string]: FormWithAnswers[]
}

export type {
  User,
  Form,
  StorageUser,
  UserForms,
  FormWithAnswers,
};
