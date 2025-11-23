import { useEffect } from 'react'
import { FaDog, FaCat, FaBirthdayCake, FaMapMarkerAlt, FaSyringe, FaMars, FaVenus, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import type { PetModalProps } from '../types'
import { calculateAge } from '../utils'

const PetModal = ({ pet, onClose }: PetModalProps) => {
   useEffect(() => {
      if (pet) document.body.style.overflow = 'hidden'

      return () => {
         document.body.style.overflow = 'unset'
      }
   }, [pet])

   if (!pet) return null

   return (
      <div
         className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn'
         onClick={onClose}
      >
         <div
            className='bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col'
            onClick={(e) => e.stopPropagation()}
         >
            <div className='relative shrink-0'>
               <button
                  className='absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:rotate-90 transition-all duration-300 shadow-lg'
                  onClick={onClose}
                  aria-label='Fechar modal'
               >
                  ×
               </button>

               <div className='h-100 bg-gray-100 relative overflow-hidden'>
                  <img
                     src={pet.img}
                     alt={pet.name}
                     className='w-full h-full object-cover'
                  />

                  <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent'></div>

                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                     <h2 className='text-4xl font-bold text-white mb-3 drop-shadow-lg'>{pet.name}</h2>
                     <div className='flex items-center gap-3 flex-wrap'>
                        <span className='bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2'>
                           <FaBirthdayCake />
                           <span>{calculateAge(pet.age)}</span>
                        </span>
                        <span className='bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2'>
                           {pet.sex === 'macho' ? <FaMars /> : <FaVenus />}
                           <span className='capitalize'>{pet.sex}</span>
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className='flex-1 overflow-y-auto px-6 py-6 bg-white'>
               <div className='mb-8'>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>Sobre {pet.name}</h3>
                  <p className='text-gray-600 leading-relaxed'>
                     {pet.about}
                  </p>
               </div>

               <div className='mb-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Informações</h3>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                     <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                        <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Raça</p>
                        <p className='text-sm font-bold text-gray-900'>{pet.race}</p>
                     </div>
                     <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                        <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Peso</p>
                        <p className='text-sm font-bold text-gray-900'>{pet.weight} kg</p>
                     </div>
                     <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                        <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Idade</p>
                        <p className='text-sm font-bold text-gray-900'>{calculateAge(pet.age)}</p>
                     </div>
                     <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                        <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Sexo</p>
                        <p className='text-sm font-bold text-gray-900 capitalize'>{pet.sex}</p>
                     </div>
                  </div>
               </div>

               <div className='mb-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Características</h3>
                  <div className='flex flex-wrap gap-2'>
                     <span className='bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 flex items-center gap-2'>
                        {pet.specie === 'cão' ? <><FaDog /> Cachorro</> : <><FaCat /> Gato</>}
                     </span>
                     {pet.vaccinated && (
                        <span className='bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 flex items-center gap-2'>
                           <FaSyringe /> Vacinado
                        </span>
                     )}
                     <span className='bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 flex items-center gap-2'>
                        <FaMapMarkerAlt /> {pet.city}/{pet.state}
                     </span>
                  </div>
               </div>
            </div>

            <div className='shrink-0 p-6 bg-gray-50 border-t border-gray-200'>
               {pet.userName && (
                  <div className='mb-4 text-center'>
                     <p className='text-sm text-gray-600'>
                        Responsável: <span className='font-semibold text-gray-800'>{pet.userName}</span>
                     </p>
                  </div>
               )}
               <div className='grid grid-cols-2 gap-3'>
                  <button
                     className='bg-green-500 text-white py-3.5 rounded-xl font-semibold text-base hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                     onClick={() => {
                        const phone = pet.phoneNumber?.replace(/\D/g, '')
                        const message = encodeURIComponent(`Olá! Tenho interesse em adotar o(a) ${pet.name}.`)
                        window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
                     }}
                     disabled={!pet.phoneNumber}
                  >
                     <FaWhatsapp className='text-lg' />
                     <span>WhatsApp</span>
                  </button>
                  <button
                     className='bg-focinhando-accent text-white py-3.5 rounded-xl font-semibold text-base hover:bg-focinhando-accent/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                     onClick={() => {
                        const subject = encodeURIComponent(`Interesse em adotar ${pet.name}`)
                        const body = encodeURIComponent(`Olá ${pet.userName || ''},\n\nTenho interesse em adotar o(a) ${pet.name}.\n\nAguardo seu contato.`)
                        window.open(`mailto:${pet.email}?subject=${subject}&body=${body}`, '_blank')
                     }}
                     disabled={!pet.email}
                  >
                     <FaEnvelope className='text-lg' />
                     <span>E-mail</span>
                  </button>
               </div>
               <p className='text-center text-xs text-gray-500 mt-3'>
                  Escolha a melhor forma de entrar em contato
               </p>
            </div>
         </div>
      </div>
   )
}

export default PetModal
