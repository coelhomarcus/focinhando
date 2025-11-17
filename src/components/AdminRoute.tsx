import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

interface AdminRouteProps {
   children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
   const token = localStorage.getItem('authToken')
   const isAdmin = localStorage.getItem('isAdmin') === 'true'

   if (!token) {
      // Se não houver token, redireciona para login
      return <Navigate to="/login" replace />
   }

   if (!isAdmin) {
      // Se não for admin, redireciona para home
      return <Navigate to="/" replace />
   }

   // Se for admin, renderiza o conteúdo protegido
   return <>{children}</>
}

export default AdminRoute
