export interface IUser {
  login: string;
  email?: string;
  psw: string;
  cardNumber?: string;
}
export const USER_STORE_NAME = 'user';
