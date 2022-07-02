import { APIURL } from "./config";

class APIManager {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = APIURL;
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.#baseUrl}${endpoint}`);
    const result = await response.json();
    return result;
  }

  async post(endpoint: string, body: unknown) {
    const response = await fetch(`${this.#baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  }
}

export default new APIManager(APIURL);