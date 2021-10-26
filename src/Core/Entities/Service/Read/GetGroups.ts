export interface GetGroupsRequest {}

export interface GetGroupsResponse {
  id:           number;
  title:        string;
  description:  string;
  participants: string[];
}
