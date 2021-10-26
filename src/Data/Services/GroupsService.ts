import { GetGroupsResponse } from "../../Core/Entities/Service/Read/GetGroups";
import { LoginUserResponse } from "../../Core/Entities/Service/Read/LoginUser";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer";

export default function GroupsService () {
  async function getGroups() {
    const response = await AxiosServer.get<GetGroupsResponse[]>('/groups');
    return {
      ...response,
      data: response.data.filter(group => group.title)
    }
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
    return await AxiosServer.put<LoginUserResponse>('/students', requestUser);
    
  }

  async function leaveGroup(user: LoginUserResponse, groupName: string) {
    const newGroups = user.groups.filter(group => group.title !== groupName)
    if (newGroups.length === 0) {
      newGroups.push({
        id: 0,
        description: '',
        participants: [],
        title: '',
      })
    }
    const requestUser = {
      email: user.email,
      groups: newGroups,
      interests: user.interests,
    }
    return await AxiosServer.put<LoginUserResponse>('/students', requestUser);
    
  }
  
  return {
    getGroups,
    enterToGroup,
    leaveGroup,
  };
}