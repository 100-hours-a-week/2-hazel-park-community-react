export interface User {
  id: string
  email: string
  nickname: string
  profile_picture?: string
}

export interface SessionUserResponse {
  user?: User
}

export interface CheckEmailResponse {
  code: number
  message: string
}

export interface CheckNicknameResponse {
  code: number
  message: string
}
