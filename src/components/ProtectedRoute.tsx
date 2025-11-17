import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
   children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const token = localStorage.getItem('authToken')

   if (!token) {
      // Se não houver token, redireciona para login
      return <Navigate to="/login" replace />
   }

   // Se houver token, renderiza o conteúdo protegido
   return <>{children}</>
}

export default ProtectedRoute
