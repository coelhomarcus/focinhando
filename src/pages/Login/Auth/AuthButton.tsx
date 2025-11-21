import type { ButtonHTMLAttributes } from 'react'
import { FaSpinner } from "react-icons/fa";


interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   loading?: boolean
   loadingText?: string
   children: string
}

const AuthButton = ({ loading = false, loadingText = 'Carregando...', children, ...props }: AuthButtonProps) => {
   return (
      <button
         type="submit"
         className='w-full py-3 px-4 bg-focinhando-accent text-white font-medium rounded-lg hover:bg-focinhando-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focinhando-accent transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
         {...props}
      >
         {loading ? (
            <span className='flex items-center justify-center'>
               <FaSpinner className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'/> 
               {loadingText}
            </span>
         ) : children}
      </button>
   )
}

export default AuthButton
