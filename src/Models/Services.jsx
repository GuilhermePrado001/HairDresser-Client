import acess from "../Services/Api/api";

export const GetAllServices = async () => {
  try {
    const { data } = await acess.api.get(`/services`);
    return data;
  } catch {
    return [];
  }
};

export const GetServiceById = async (id) => {
  try {
    if (!id) return null;
    const { data } = await acess.api.get(`/services/${id}`);
    return data;
  } catch {
    return [];
  }
};

export const AddServices = async (obj) => {
  if (obj === null) return null;
  try {
    const { data } = await acess.api.post(`/services`, obj);
    return data;
  } catch {
    return [];
  }
};

export const UpdateServices = async (obj) => {
  if (obj === null) return null;
  try {
    const { data } = await acess.api.put(`/services`, obj);
    return data;
  } catch {
    return [];
  }
};

export const DeleteService = async (id) => {
  if (id === null) return null;
  try {
    const { data } = await acess.api.delete(`/services/${id}`);
    return data;
  } catch {
    return [];
  }
};
