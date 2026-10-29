import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getAllVallas = async (page?: number, limit?: number) => {
  const response = await axios.get(`${API_URL}/vallas?cache=false`, {
    params: { page, limit },
  });
  return response.data;
};

export const createValla = async (data: FormData) => {
  const response = await axios.post(`${API_URL}/vallas`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const updateValla = async (id: number, data: FormData) => {
  const response = await axios.put(`${API_URL}/vallas/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteValla = async (id: number) => {
  const response = await axios.delete(`${API_URL}/vallas/${id}`);
  return response.data;
};



export const getEstados = async () => {
  const response = await axios.get(`${API_URL}/estados`);
  return response.data;
};

export const getCiudades = async (estadoId:string) => {
  const response = await axios.get(`${API_URL}/ciudades/estado/${estadoId}`);
  return response.data;
};



export const searchVallas = async (
  minPrice?: number,
  maxPrice?: number,
  ciudadId?: number,
  estadoId?: number
) => {
  const response = await axios.get(`${API_URL}/vallas/disponibles/search`, {
    params: {
      minPrice,
      maxPrice,
      ciudadId,
      estadoId
    }
  });
  // Ensure we always return an array
  return Array.isArray(response.data) ? response.data : response.data.items || [];
};