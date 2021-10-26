import { RegisterUserRequest, RegisterUserResponse } from "../../Core/Entities/Service/Create/RegisterUser";
import { GetUserProfileRequest, GetUserProfileResponse } from "../../Core/Entities/Service/Read/GetUserProfile";
import { LoginUserRequest, LoginUserResponse } from "../../Core/Entities/Service/Read/LoginUser";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer"

export default function ProfileService () {

  const loginProfile = async (params: LoginUserRequest) => {
    const response = await AxiosServer.post<LoginUserResponse>(`/students/login`, {
      ...params
    });
    return response.data;
  }

  const registerUser = async (params: RegisterUserRequest) => {
    const response = await AxiosServer.post<RegisterUserResponse>(`/students`, {
      ...params
    });
    return response.data;
  }

  const updateProfile = async (newProfile: UpdateUserProfileRequest) => {
    const response = await AxiosServer.put<UpdateUserProfileResponse>(`/students`, {
      body: newProfile,
    });
    return response.data;
  }

  return {
    loginProfile,
    registerUser,
    updateProfile,
  }
}