import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { useApi } from '@/hooks/useApi'
import { UserContext } from './UserContext'
import type { User, UserComplement } from './UserContext'

interface UserProviderProps {
   children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
   const { apiBaseUrl } = useApi()
   const [user, setUser] = useState<User | null>(null)
   const [userComplement, setUserComplement] = useState<UserComplement | null>(null)
   const [loading, setLoading] = useState(true)

   const refreshUserData = useCallback(async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
         setLoading(false)
         return
      }

      try {
         setLoading(true)

         // Load user basic data
         const response = await fetch(`${apiBaseUrl}/user`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const data = await response.json()
         if (!data.error && data.user) {
            setUser(data.user)
         }

         // Load user complement (includes profile image)
         const complementResponse = await fetch(`${apiBaseUrl}/user/complement`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const complementData = await complementResponse.json()
         if (!complementData.error && complementData.complement) {
            setUserComplement(complementData.complement)
         }
      } catch (error) {
         console.error('Erro ao carregar dados do usuário:', error)
      } finally {
         setLoading(false)
      }
   }, [apiBaseUrl])

   useEffect(() => {
      refreshUserData()
   }, [refreshUserData])

   return (
      <UserContext.Provider value={{ user, userComplement, loading, refreshUserData }}>
         {children}
      </UserContext.Provider>
   )
}
