export type TUser = {
  email: string | null
  id: string | null
  isActivated: boolean
}

export type TUserResponse = {
  accessToken: string
  refreshToken: string
  user: TUser
}
