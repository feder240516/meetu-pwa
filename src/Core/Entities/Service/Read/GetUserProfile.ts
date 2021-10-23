import UserProfile from "../../UserProfile";

export interface GetUserProfileRequest {
  id: number
}

export interface GetUserProfileResponse {
  data: UserProfile[];
}