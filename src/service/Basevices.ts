import Axios from "axios";
import humps from "humps";

export interface IApiResponse<T> {
  status: number;
  body: T;
}

export interface IMetadata {
  page: number;
  limit: number;
  totalItemCount: number;
  totalPage: number;
}

// CONFIG SERVICE
const TOKEN_NAME: string = process.env.REACT_APP_TOKEN_NAME as string;
const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

const getToken = (): string | null => localStorage.getItem("token");

// METHODS CALL API
export const apiCall = async (
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  data: { [key: string]: any } | undefined,
  isToken: boolean,
): Promise<IApiResponse<any>> => {
  const headers: { [key: string]: string } = {};
  headers["Content-Type"] = "application/json";
  if (isToken) headers[TOKEN_NAME] = getToken() || "";

  return new Promise<any>((resolve) => {
    Axios({
      url: baseUrl + url,
      method: method,
      headers: headers,
      data: data ? JSON.stringify(data) : undefined,
    })
      .then((next) => {
        if (next.data.code === 403) {
          // openNotification("ERROR", next.data.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status,
        });
      })
      .catch((error) => {
        try {
          resolve({
            body: humps.camelizeKeys(error.response.data),
            status: error.response.error,
          });
        } catch (e) {
          resolve({
            body: e,
            status: 500,
          });
        }
      });
  });
};

export const getRequest = async (url: string, isToken: boolean = true, isLogError: boolean = false): Promise<IApiResponse<any>> => {
  const headers: { [key: string]: string } = {};
  headers["Content-Type"] = "application/json";

  if (isToken) headers[TOKEN_NAME] = getToken() || "";

  return new Promise<any>((resolve) => {
    Axios.get(baseUrl + url, isToken ? { headers: headers } : undefined)
      .then((next) => {
        if (next.data.code === 403) {
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status,
        });
      })
      .catch((error) => {
        try {
          resolve({
            body: humps.camelizeKeys(error.response.data),
            status: error.response.status,
          });
        } catch (e) {
          resolve({
            body: e,
            status: 500,
          });
        }
      })
      .finally();
  });
};

export const postRequest = (
  url: string,
  isToken: boolean = true,
  data?: { [key: string]: any },
): Promise<IApiResponse<any>> => {
  return apiCall(url, "POST", data, isToken);
};

export const putRequest = (
  url: string,
  isToken: boolean = true,
  data?: { [key: string]: any },
): Promise<IApiResponse<any>> => {
  return apiCall(url, "PUT", data, isToken);
};

export const deleteRequest = (
  url: string,
  isToken: boolean = true,
  data?: { [key: string]: any },
): Promise<IApiResponse<any>> => {
  return apiCall(url, "DELETE", data, isToken);
};
