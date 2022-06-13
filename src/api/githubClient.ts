import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cache } from "../utils/cacheHandler";

function requestHandler(request: AxiosRequestConfig) {
  const r = `${request.url}/${request.params.q}`;
  if (request.method === "GET" || "get") {
    const checkIsValidResponse = cache.isValid(r || "");
    if (checkIsValidResponse.isValid) {
      console.log("serving cached data");
      request.headers!.cached = true;
      request.data = JSON.parse(checkIsValidResponse.value || "{}");
      return Promise.reject(request);
    }
  }
  return request;
}

function responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
  if (response.config.method === "GET" || "get") {
    if (response.config.url) {
      console.log("storing in cache");
      cache.store(
        `${response.config.url}/${response.config.params.q}`,
        JSON.stringify(response.data)
      );
    }
  }
  return response;
}

function errorHandler(error: any) {
  if (error.headers?.cached === true) {
    console.log("got cached data in response, serving it directly");
    return Promise.resolve(error);
  }
  return Promise.reject(error);
}

export const githubClient = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

githubClient.interceptors.request.use((request) => requestHandler(request));
githubClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
