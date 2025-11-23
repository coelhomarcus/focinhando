import { FaUser, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import type { ProfileHeaderProps } from '../types'
import { getMemberSince } from '../utils'


const ProfileHeader = ({ user, complement }: ProfileHeaderProps) => {
   return (
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8'>
         <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
            {/* Avatar */}
            <div className='relative mx-auto sm:mx-0'>
               <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden border-4 border-focinhando-accent/20 shadow-lg'>
                  <img
                     src={complement?.img || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ee6551&color=fff&size=128`}
                     alt='Profile'
                     className='w-full h-full object-cover'
                  />
               </div>
               <div className='absolute -bottom-2 -right-2 bg-focinhando-accent text-white p-1.5 sm:p-2 rounded-full shadow-lg'>
                  <FaUser className='text-base sm:text-lg' />
               </div>
            </div>

            {/* User Info */}
            <div className='flex-1 text-center sm:text-left'>
               <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between mb-3 sm:mb-4'>
                  <div className='w-full'>
                     <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 wrap-break-word'>{user?.name || 'Usuário'}</h2>
                     <p className='text-base sm:text-lg text-focinhando-accent font-semibold mb-2 sm:mb-3'>
                        {user?.role === 'admin' ? 'Administrador' : 'Membro'}
                     </p>
                  </div>
               </div>

               <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3'>
                  <div className='flex items-center justify-center sm:justify-start gap-2 text-gray-600'>
                     <FaMapMarkerAlt className='text-focinhando-accent shrink-0' />
                     <span className='text-xs sm:text-sm truncate'>
                        {complement ? `${complement.city}, ${complement.state}` : 'Localização não informada'}
                     </span>
                  </div>
                  <div className='flex items-center justify-center sm:justify-start gap-2 text-gray-600'>
                     <FaClock className='text-focinhando-accent shrink-0' />
                     <span className='text-xs sm:text-sm'>
                        {user && getMemberSince(user.createdAt)}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProfileHeader
