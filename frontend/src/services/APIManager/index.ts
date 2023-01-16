import { APIURL } from "./config";

interface RequestOptions {
  url: string;
  method: 'GET' | 'POST';
  body?: object;
  withPagination?: boolean;
}
class APIManager {
  #baseUrl: string;
  #token: null | string = null;

  constructor(baseUrl: string) {
    this.#baseUrl = APIURL;
  }

  async #makeRequest(options: RequestOptions) {
    const response = await fetch(options.url, {
      method: options.method,
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      headers: {
        'Content-Type': 'application/json',
        ...(this.#token ? { Authorization: `Token ${this.#token}` } : {})
      }
    });

    const answer = await response.json();

    if (options.withPagination) return answer.results;
    return answer;
  }

  async get(endpoint: string, withPagination?: boolean) {
    console.log(`${this.#baseUrl}${endpoint}`);
    const results = await this.#makeRequest({
      url: `${this.#baseUrl}${endpoint}`,
      method: 'GET',
      withPagination,
    });

    return results;
  }

  async post(endpoint: string, body?: object) {
    const results = await this.#makeRequest({
      url: `${this.#baseUrl}${endpoint}`,
      method: "POST",
      body,
    });
    return results;
  }

  updateToken(token: string) {
    this.#token = token;
  }
}

export default new APIManager(APIURL);