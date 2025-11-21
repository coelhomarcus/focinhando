import type { ReactNode } from 'react'
import Logo from '@/assets/logo.svg'

interface AuthFormContainerProps {
   title: string
   subtitle: string
   children: ReactNode
}

const AuthFormContainer = ({ title, subtitle, children }: AuthFormContainerProps) => {
   return (
      <div className='w-full max-w-md'>
         <div className='mb-8'>
            <img src={Logo} alt="Logo" className='h-12 w-auto' />
         </div>

         <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{title}</h1>
            <p className='text-gray-600'>{subtitle}</p>
         </div>

         {children}
      </div>
   )
}

export default AuthFormContainer
