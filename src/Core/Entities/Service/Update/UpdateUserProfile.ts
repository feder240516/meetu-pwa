import UserProfile from "../../UserProfile";

export interface UpdateUserProfileRequest {
  id: number;
  name: string;
  hairStyle: number;
  skinColor: number;
  gender: string;
}

export interface UpdateUserProfileResponse {}