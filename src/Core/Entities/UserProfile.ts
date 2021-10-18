export default interface UserProfile {
  id: number,
  name: string,
}

export interface UpdateProfileRequest {
  id: number,
  name: string,
}