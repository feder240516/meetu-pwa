export interface LoginUserRequest {
  email:    string;
  password: string;
}

export interface LoginUserResponse {
  id:         number;
  email:      string;
  password:   string;
  name:       string;
  lastName:   string;
  career:     string;
  status:     string;
  university?: string | null;
  avatar:     Avatar;
  groups:     Group[];
  interests:  Interest[];
}

export interface Interest {
  id:   number;
  name: string;
}

export interface Avatar {
  id?:        number;
  sexo:      string;
  hairStyle: string;
  skinColor: string;
  hairColor: string;
}

export interface Group {
  id:           number;
  title:        string;
  description:  string;
  participants: string[];
}
