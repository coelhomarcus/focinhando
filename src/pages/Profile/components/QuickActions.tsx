import { FaPaw, FaHome, FaInfoCircle, FaEdit, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import type { QuickActionsProps } from '../types'

const QuickActions = ({ onNavigate, onLogout }: QuickActionsProps) => {
   return (
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 mt-4'>
         <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2'>
            <FaPaw className='text-focinhando-accent' />
            Acesso Rápido
         </h3>
         <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6'>
            <button
               onClick={() => onNavigate('/')}
               className='group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300'
            >
               <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <FaHome className='text-white text-base sm:text-xl' />
               </div>
               <span className='font-semibold text-gray-900 text-xs sm:text-sm text-center leading-tight'>Ver Pets Disponíveis</span>
            </button>
            <button
               onClick={() => onNavigate('/about')}
               className='group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-linear-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-purple-200 hover:border-purple-300'
            >
               <div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <FaInfoCircle className='text-white text-base sm:text-xl' />
               </div>
               <span className='font-semibold text-gray-900 text-xs sm:text-sm text-center leading-tight'>Sobre Nós</span>
            </button>
            <button
               onClick={() => onNavigate('/blog')}
               className='group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-linear-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-green-200 hover:border-green-300'
            >
               <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <FaEdit className='text-white text-base sm:text-xl' />
               </div>
               <span className='font-semibold text-gray-900 text-xs sm:text-sm text-center leading-tight'>Ler Blog</span>
            </button>
            <button
               onClick={() => onNavigate('/contact')}
               className='group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-linear-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl hover:shadow-lg transition-all border border-orange-200 hover:border-orange-300'
            >
               <div className='w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                  <FaEnvelope className='text-white text-base sm:text-xl' />
               </div>
               <span className='font-semibold text-gray-900 text-xs sm:text-sm text-center leading-tight'>Entrar em Contato</span>
            </button>
         </div>

         <button
            onClick={onLogout}
            className='w-full bg-red-500 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl font-semibold hover:bg-red-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group'
         >
            <FaSignOutAlt className='group-hover:translate-x-1 transition-transform' />
            Sair da Conta
         </button>
      </div>
   )
}

export default QuickActions
