import acess from "../Services/Api/api";

export const GetUsers = async () => {
  try {
    const { data } = await acess.api_identity.get(`/user/getusers`);

    return data;
  } catch {
    return false;
  }
};

export const AddUsers = async (user) => {
  try {
    const { data } = await acess.api_identity.post(`/user/register`, user);

    return data;
  } catch {
    return false;
  }
};

export const UpdateUsers = async (user) => {
  try {
    const { data } = await acess.api_identity.post(`/user/updateuser`, {
      Email: user?.email,
      PhoneNumber: user?.phoneNumber,
    });

    return data;
  } catch {
    return false;
  }
};

export const DeleteUser = async (email) => {
  try {
    const { data } = await acess.api_identity.delete(
      `/user/RemoveUser/${email}`
    );

    return data;
  } catch {
    return false;
  }
};
