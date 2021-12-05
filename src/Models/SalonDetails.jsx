import acess from "../Services/Api/api";

export const UpdateDescription = async (obj) => {
  try {
    const { data } = await acess.api.put(`/salondetail`, obj);
    return data;
  } catch {
    return [];
  }
};
