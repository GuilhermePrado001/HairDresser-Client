import acess from "../Services/Api/api";
import { scheduleByUserIdNormalize } from "./Normalize/ScheduleNormalize";

export const GetAllInstitution = async (id = null) => {
  if (id === null) return [];
  try {
    const { data } = await acess.api.get(`/finance-erp/institution/type/${id}`);
    return data;
  } catch {
    return [];
  }
};

export const AvailableHours = async (obj) => {
  if (!obj) return [];
  try {
    const { data } = await acess.api.post(`/schedule/availableHours`, obj);
    return data;
  } catch {
    return [];
  }
};

export const saveScheduling = async (obj) => {
  if (!obj) return [];
  try {
    const { data } = await acess.api.post(`/schedule`, obj);
    return data;
  } catch {
    return [];
  }
};

export const getSchedulingByUserId = async (userId) => {
  if (!userId) return [];
  try {
    const { data } = await acess.api.get(`/schedule/user/${userId}`);
    return scheduleByUserIdNormalize(data);
  } catch {
    return [];
  }
};
