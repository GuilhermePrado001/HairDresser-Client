import acess from "../Services/Api/api";

export const GetSettingsById = async (id) => {
  try {
    const { data } = await acess.api.get(`/setting/${id}`);
    return data;
  } catch {
    return [];
  }
};
