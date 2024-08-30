export default class Api {
  static baseURL = "http://localhost:8000";

  static async fetch(url, init) {
    try {
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Failed to fetch", e);
    }
  }

  static getUrl(uri) {
    return `${Api.baseURL}/${uri}`;
  }

  static getInit(method, body = null) {
    const init = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) &&
      body
    ) {
      init.body = JSON.stringify(body);
    }
    return init;
  }
}

