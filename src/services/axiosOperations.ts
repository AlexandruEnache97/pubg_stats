import axios, { AxiosRequestConfig } from 'axios';

export const get = async (url: string) => {
  try {
    const config: AxiosRequestConfig = {
      method: 'get',
      url,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async (url: string, data: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(url, data, config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const put = async (url: string, data: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.put(url, data, config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const remove = async (url: string, data: any) => {
  try {
    const config: AxiosRequestConfig = {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.delete(url, config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
