export interface IUser {
  id? : string,
  name: string,
  email: string,
  password?: string,
  last_login: Date,
  token?: string,
  phones: [
        {
          number: string,
          ddd: string
        }
  ]
}
export type IUserDecryt = {
  data: IUser
}
