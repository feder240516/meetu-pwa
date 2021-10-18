import UserProfile from "../UserProfile";

export interface GetUserProfileRequest {
  id: number
}

export interface GetUserProfileResponse {
  status: number;
  data: UserProfile[];
}