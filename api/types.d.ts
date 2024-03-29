export interface UserFields {
  _id: string;
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface newUserData {
  email: string;
  password: string;
  displayName: string;
  avatar: string;
}
