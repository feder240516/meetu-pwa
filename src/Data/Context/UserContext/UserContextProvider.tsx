// Generated by https://quicktype.io

import React, { useContext, useState } from "react";

interface Interest {
  id:   number;
  name: string;
}

interface Group {
  id:   number;
  name: string;
}

export interface IUserContext {
  id:         number;
  email:      string;
  password:   string;
  name:       string;
  lastName:   string;
  career:     string;
  status?:     null;
  university?: null;
  avatar?:     null;
  groups:     Group[];
  interests:  Interest[];
}

export const UserContext = React.createContext<
  [
    IUserContext | null,
    React.Dispatch<
      React.SetStateAction<
        IUserContext | null
    >>
  ]>([null, () => null]);

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUserContext | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;