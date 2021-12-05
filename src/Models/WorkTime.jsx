import acess from "../Services/Api/api";

export const UpdateWorkTime = async (obj) => {
  try {
    const { data } = await acess.api.put(`/worktime`, obj);
    return data;
  } catch {
    return [];
  }
};
