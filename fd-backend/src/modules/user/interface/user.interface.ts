export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserSchema extends IUser {
  hashPassword(): Promise<void>;
}
