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