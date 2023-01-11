interface Question {
  id: number;
  text: string;
}

export interface Template {
  id: number;
  name: string;
  questions: Question[];
  description: string;
  image: string;
  rating: number;
}