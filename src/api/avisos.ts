import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getAllAvisos = async (page?: number, limit?: number) => {
  const response = await axios.get(`${API_URL}/avisos?cache=false`, {
    params: { page, limit },
  });
  return response.data;
};

export const createAviso = async (data: FormData) => {
  const response = await axios.post(`${API_URL}/avisos`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateAviso = async (id: number, data: FormData) => {
    const response = await axios.put(`${API_URL}/avisos/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  export const deleteAviso = async (id: number) => {
    const response = await axios.delete(`${API_URL}/avisos/${id}`);
    return response.data;
  };
