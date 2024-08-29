export default class Api {
  static baseURL;

  constructor(baseURL) {
    Api.baseURL = baseURL;
  }

  static async fetch(url, init) {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Failed to fetch", error);
    }
  }

  static getUrl(uri) {
    return `${Api.baseURL}/${uri}`;
  }

  static getInit(method) {
    const init = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return init;
  }
}

