export type UserInfo = {
  id: string;
  name: string;
  email: string;
}

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
}

export type LoginUserDto = {
  email: string;
  password: string;
}

export type UserToken = {
  token: string;
}
