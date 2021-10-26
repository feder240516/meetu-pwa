import UserProfile from "../../UserProfile";

export interface UpdateUserProfileResponse {}

export interface UpdateUserProfileRequest {
  email:     string;
  groups:    Group[];
  interests: Interest[];
}

export interface Group {
  id:          number;
  title:       string;
  description: string;
  participants: string[];
}

export interface Interest {
  id:  number;
  name: string;
}
