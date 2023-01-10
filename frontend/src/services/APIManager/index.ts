import { userLoginMocks } from './../mocks/mocks';
import { formTemplatesMocks } from '../mocks/mocks';
import { APIURL } from "./config";
class APIManager {
  #baseUrl: string;

  private mocks = {
    'get:forms/template': formTemplatesMocks,
    'post:users': userLoginMocks,
  };

  constructor(baseUrl: string) {
    this.#baseUrl = APIURL;
  }

  async get(endpoint: string) {
    for (const [url, answer] of Object.entries(this.mocks)) {
      if (`get:${endpoint}` !== url) continue;
      await new Promise(resolve => setTimeout(resolve, 1e3));
      return answer;
    }


    const response = await fetch(`${this.#baseUrl}${endpoint}`);
    const result = await response.json();
    return result;
  }

  async post(endpoint: string, body: unknown) {
    for (const [url, answer] of Object.entries(this.mocks)) {
      if (`post:${endpoint}` !== url) continue;
      await new Promise(resolve => setTimeout(resolve, 1e3));
      return answer;
    }


    const response = await fetch(`${this.#baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  }
}

export default new APIManager(APIURL);