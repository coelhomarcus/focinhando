import { Navigate, useNavigate } from 'react-router'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'

interface AdminRouteProps {
   children: ReactNode
}

interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: string
   updatedAt: string
}

const AdminRoute = ({ children }: AdminRouteProps) => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate();
   const token = localStorage.getItem('authToken')
   const [user, setUser] = useState<User | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const loadUser = async () => {
         if (!token) {
            setLoading(false)
            return
         }

         try {
            const response = await fetch(`${apiBaseUrl}/user`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            if (response.status === 401 || response.status === 403) {
               localStorage.removeItem('authToken');
               navigate('/login');
               return;
            }

            const data = await response.json()
            if (!data.error && data.user) {
               setUser(data.user)
            }
         } catch (error) {
            console.error('Erro ao carregar usuário:', error)
         } finally {
            setLoading(false)
         }
      }

      loadUser()
   }, [apiBaseUrl, token, navigate])

   if (loading) {
      // Mostra loading enquanto verifica
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-focinhando-accent mx-auto"></div>
               <p className="mt-4 text-gray-600">Verificando permissões...</p>
            </div>
         </div>
      )
   }

   if (!token || !user) {
      // Se não houver token ou usuário, redireciona para login
      return <Navigate to="/login" replace />
   }

   if (user.role !== 'admin') {
      // Se não for admin, redireciona para home
      return <Navigate to="/" replace />
   }

   // Se for admin, renderiza o conteúdo protegido
   return <>{children}</>
}

export default AdminRoute
