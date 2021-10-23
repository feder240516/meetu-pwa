import { GetUserProfileRequest, GetUserProfileResponse } from "../../Core/Entities/Service/Read/GetUserProfile";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer"

export default function ProfileService () {
  const getProfile = async (params: GetUserProfileRequest) => {
    const response = await AxiosServer.get<GetUserProfileResponse>(`/profile/${params.id}`);
    return response.data;
  }
  const updateProfile = async (newProfile: UpdateUserProfileRequest) => {
    const response = await AxiosServer.put<UpdateUserProfileResponse>(`/profile/${newProfile.id}`, {
      body: newProfile,
    });
    return response.data;
  }
  return {
    getProfile,
    updateProfile,
  }
}