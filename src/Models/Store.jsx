import acess from "../Services/Api/api";

export const UpdateStore = async (obj) => {
  try {
    const { data } = await acess.api.put(`/store`, obj);
    return data;
  } catch {
    return [];
  }
};
