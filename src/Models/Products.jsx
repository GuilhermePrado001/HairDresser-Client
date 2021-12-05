import acess from "../Services/Api/api";

export const AddProduct = async (obj) => {
  if (obj === null) return null;
  try {
    const { data } = await acess.api.post(`/product`, obj);
    return data;
  } catch {
    return [];
  }
};

export const UpdateProduct = async (obj) => {
  if (obj === null) return null;
  try {
    const { data } = await acess.api.put(`/product`, obj);
    return data;
  } catch {
    return [];
  }
};

export const DeleteProduct = async (id) => {
  if (id === null) return null;
  try {
    const { data } = await acess.api.delete(`/product/${id}`);
    return data;
  } catch {
    return [];
  }
};

export const GetProducts = async (obj) => {
  if (obj === null) return null;
  try {
    const { data } = await acess.api.get(`/product`);
    return data;
  } catch {
    return [];
  }
};

export const GetProductById = async (id) => {
  if (id === null) return null;
  try {
    const { data } = await acess.api.get(`/product/${id}`);
    return data;
  } catch {
    return [];
  }
};
