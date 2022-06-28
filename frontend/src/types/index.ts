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
  questions: Question[];
}

type StorageUser = User | null;

export type {
  User,
  Form,
  StorageUser,
};