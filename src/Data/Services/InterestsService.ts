import { GetGroupsResponse } from "../../Core/Entities/Service/Read/GetGroups";
import { LoginUserResponse, Interest } from "../../Core/Entities/Service/Read/LoginUser";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer";

export default function GroupsService () {

  async function setInterests(user: LoginUserResponse, interests: Interest[]) {
    if (interests.length === 0) {
      interests = [{
        id: 0,
        name: '',
      }];
    }
    const requestUser = {
      email: user.email,
      groups: user.groups,
      interests: interests,
    }
    return await AxiosServer.put<LoginUserResponse>('/students', requestUser);
    
  }
  
  async function addInterest(user: LoginUserResponse, interest: Interest) {
    const requestUser = {
      email: user.email,
      groups: user.groups,
      interests: [...user.interests, interest],
    }
    return await AxiosServer.put<LoginUserResponse>('/students', requestUser);
  }

  async function removeInterest(user: LoginUserResponse, interest: Interest) {
    const modifiedInterests = user.interests.filter(i => i.id !== interest.id);
    if (modifiedInterests.length === 0) {
      modifiedInterests.push({
        id: 0,
        name: '',
      });
    }
    const requestUser = {
      email: user.email,
      groups: user.groups,
      interests: modifiedInterests,
    }
    return await AxiosServer.put<LoginUserResponse>('/students', requestUser);
  }
  
  return {
    addInterest,
    removeInterest,
    setInterests,
  };
}