import { IMyBest } from '@/types/my-best'

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  fullName: string
  email: string
  password: string
}

export interface IProfile {
  userId: string
  fullName: string
  email: string
  profilePicture: string
  createdAt: string
  bestResult: IMyBest
}
export interface IUpdateProfile {
  fullName: string
  profilePicture: FileList
}
export interface IChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
