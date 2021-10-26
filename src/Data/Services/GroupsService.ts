import { GetGroupsResponse } from "../../Core/Entities/Service/Read/GetGroups";
import { LoginUserResponse } from "../../Core/Entities/Service/Read/LoginUser";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer";

export default function GroupsService () {
  async function getGroups() {
    return await AxiosServer.get<GetGroupsResponse[]>('/groups');
  }

  async function enterToGroup(user: LoginUserResponse, group: GetGroupsResponse) {
    const modifiedUser: LoginUserResponse = {
      ...user,
      groups: [
        ...user.groups,
        group
      ]
    }
    const requestUser = {
      email: modifiedUser.email,
      groups: modifiedUser.groups,
      interests: modifiedUser.interests,
    }
    await AxiosServer.put<LoginUserResponse>('/students', requestUser);
    return modifiedUser;
  }
  
  return {
    getGroups,
    enterToGroup,
  };
}