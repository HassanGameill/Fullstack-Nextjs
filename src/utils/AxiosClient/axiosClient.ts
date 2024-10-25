import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


const apiUrl = `https://jsonplaceholder.typicode.com/posts`;



const axiosClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // Timeout if necessary
  headers: {
    'Content-Type': 'application/json',
    // Add all custom headers here
  },
});

export const fetchData = async <T>(url: string, options: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosClient.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
};
