import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa'
import type { InfoDisplayProps } from '../types'
import { formatDate } from '../utils'

const InfoDisplay = ({ user, complement }: InfoDisplayProps) => {
   return (
      <div className='space-y-3 sm:space-y-4'>
         <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-3 sm:px-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 sm:gap-3 text-gray-600'>
               <FaEnvelope className='text-focinhando-accent shrink-0' />
               <span className='font-medium text-xs sm:text-sm'>E-mail</span>
            </div>
            <span className='text-gray-900 font-semibold text-xs sm:text-sm break-all sm:break-normal'>{user?.email || 'Não informado'}</span>
         </div>
         <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-3 sm:px-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 sm:gap-3 text-gray-600'>
               <FaPhone className='text-focinhando-accent shrink-0' />
               <span className='font-medium text-xs sm:text-sm'>Telefone</span>
            </div>
            <span className='text-gray-900 font-semibold text-xs sm:text-sm'>{complement?.phoneNumber || 'Não informado'}</span>
         </div>
         <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-3 sm:px-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 sm:gap-3 text-gray-600'>
               <FaMapMarkerAlt className='text-focinhando-accent shrink-0' />
               <span className='font-medium text-xs sm:text-sm'>Localização</span>
            </div>
            <span className='text-gray-900 font-semibold text-xs sm:text-sm'>
               {complement ? `${complement.city}, ${complement.state}` : 'Não informado'}
            </span>
         </div>
         <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-3 sm:px-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 sm:gap-3 text-gray-600'>
               <FaBirthdayCake className='text-focinhando-accent shrink-0' />
               <span className='font-medium text-xs sm:text-sm'>Data de Nascimento</span>
            </div>
            <span className='text-gray-900 font-semibold text-xs sm:text-sm'>{formatDate(complement?.dateOfBirth || null)}</span>
         </div>
      </div>
   )
}

export default InfoDisplay
