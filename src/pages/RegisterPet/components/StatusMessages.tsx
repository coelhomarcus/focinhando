import { FaCheck, FaTimes } from 'react-icons/fa'
import type { StatusMessagesProps } from '../types'

const StatusMessages = ({ submitStatus, errorMessage }: StatusMessagesProps) => {
   if (submitStatus === 'idle') return null

   return (
      <>
         {submitStatus === 'success' && (
            <div className='mt-4 sm:mt-6 bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg flex items-center gap-2'>
               <FaCheck className='shrink-0' />
               <span className='text-xs sm:text-sm font-medium'>
                  Pet cadastrado com sucesso! Redirecionando...
               </span>
            </div>
         )}

         {submitStatus === 'error' && (
            <div className='mt-4 sm:mt-6 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg flex items-center gap-2'>
               <FaTimes className='shrink-0' />
               <span className='text-xs sm:text-sm font-medium'>
                  {errorMessage || 'Erro ao cadastrar pet. Tente novamente.'}
               </span>
            </div>
         )}
      </>
   )
}

export default StatusMessages
