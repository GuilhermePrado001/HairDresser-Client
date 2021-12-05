import acess from "../Services/Api/api";

export const GetSalonByOwnerId = async (id = null) => {
  if (id === null) return null;
  try {
    const { data } = await acess.api.get(`/salon`);
    return data;
  } catch (error) {
    return error;
  }
};

export const CreateSalon = async (salon) => {
  if (!salon) return null;
  try {
    await acess.api.post(`/salon`, salon);

    return true;
  } catch {
    return false;
  }
};

export const GetMostPickedHours = async () => {
  try {
    const { data } = await acess.api.get(`/salon/report/hours`);
    return data;
  } catch {
    return false;
  }
};

export const GetSchedulesByMonth = async (year) => {
  try {
    const { data } = await acess.api.get(`/salon/report/schedules/${year}`);
    return data;
  } catch {
    return false;
  }
};

export const GetProfit = async (year) => {
  try {
    const { data } = await acess.api.get(`/salon/report/profit/${year}`);
    return data;
  } catch {
    return false;
  }
};

export const GetMostUsedServices = async () => {
  try {
    const { data } = await acess.api.get(`/salon/report/services`);
    return data;
  } catch {
    return false;
  }
};

export const GetYears = async () => {
  try {
    const { data } = await acess.api.get(`/salon/report/years`);
    return data;
  } catch {
    return false;
  }
};
