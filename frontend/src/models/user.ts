export interface User {
  username: string,
  email: string;
  id: number,
  subdivision: null | {
    name: string;
    id: number;
  }
}