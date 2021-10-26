import { GetGroupsResponse } from "../../Core/Entities/Service/Read/GetGroups";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../../Core/Entities/Service/Update/UpdateUserProfile";
import AxiosServer from "../Http/AxiosServer";

export default function GroupsService () {
  async function getGroups() {
    return await AxiosServer.get<GetGroupsResponse[]>('/groups');
  }
  
  return {
    getGroups,
  };
}