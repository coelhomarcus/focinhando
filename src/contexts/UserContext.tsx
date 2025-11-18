import { createContext } from 'react'

export interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: string
   updatedAt: string
}

export interface UserComplement {
   img: string | null
   phoneNumber?: string
   city?: string
   state?: string
   dateOfBirth?: string
}

export interface UserContextType {
   user: User | null
   userComplement: UserComplement | null
   loading: boolean
   refreshUserData: () => Promise<void>
}

export const UserContext = createContext<UserContextType>({
   user: null,
   userComplement: null,
   loading: true,
   refreshUserData: async () => { }
})
