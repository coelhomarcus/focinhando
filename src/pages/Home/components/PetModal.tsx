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
         className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn'
         onClick={onClose}
      >
         <div
            className='bg-white rounded-3xl max-w-5xl w-full h-[85vh] md:h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col md:flex-row border-4 border-gray-200'
            onClick={(e) => e.stopPropagation()}
         >
            <div className='relative w-full md:w-1/2 bg-gray-900 flex items-center justify-center overflow-hidden shrink-0 h-[35vh] md:h-full'>
               <img 
                  src={pet.img} 
                  alt="" 
                  className='absolute inset-0 w-full h-full object-cover blur-xl opacity-50' 
               />

               <button
                  className='absolute top-6 left-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-all duration-300 md:hidden'
                  onClick={onClose}
                  aria-label='Fechar modal'
               >
                  ×
               </button>
               
               <div className='w-full h-full relative z-10'>
                  <img
                     src={pet.img}
                     alt={pet.name}
                     className='w-full h-full object-cover md:object-contain drop-shadow-xl'
                  />
               </div>
            </div>

            <div className='flex-1 flex flex-col w-full md:w-1/2 h-full bg-white relative min-h-0'>
               <button
                  className='absolute top-4 right-4 z-20 hover:bg-gray-100 text-red-500 hover:text-red-800 rounded-full w-10 h-10 hidden md:flex items-center justify-center text-3xl transition-all duration-300'
                  onClick={onClose}
                  aria-label='Fechar modal'
               >
                  ×
               </button>

               <div className='flex-1 overflow-y-auto p-5 md:p-6'>
                  <div className='mb-6'>
                     <div className='flex items-center justify-between mb-2'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>{pet.name}</h2>
                     </div>
                     
                     <div className='flex items-center gap-2 flex-wrap mb-4'>
                        <span className='bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-blue-100 flex items-center gap-2'>
                           <FaBirthdayCake className="text-blue-500" />
                           <span>{calculateAge(pet.age)}</span>
                        </span>
                        <span className='bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium border border-purple-100 flex items-center gap-2'>
                           {pet.sex === 'macho' ? <FaMars className="text-purple-500" /> : <FaVenus className="text-purple-500" />}
                           <span className='capitalize'>{pet.sex}</span>
                        </span>
                     </div>

                     <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-2'>Sobre {pet.name}</h3>
                     <p className='text-gray-600 leading-relaxed text-base md:text-lg'>
                        {pet.about}
                     </p>
                  </div>

                  <div className='mb-6'>
                     <h3 className='text-base md:text-lg font-bold text-gray-900 mb-3'>Informações</h3>
                     <div className='grid grid-cols-2 gap-2 md:gap-3'>
                        <div className='bg-gray-50 border border-gray-100 p-3 rounded-xl'>
                           <p className='text-[10px] md:text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Raça</p>
                           <p className='text-sm md:text-base font-bold text-gray-900'>{pet.race}</p>
                        </div>
                        <div className='bg-gray-50 border border-gray-100 p-3 rounded-xl'>
                           <p className='text-[10px] md:text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Peso</p>
                           <p className='text-sm md:text-base font-bold text-gray-900'>{pet.weight} kg</p>
                        </div>
                        <div className='bg-gray-50 border border-gray-100 p-3 rounded-xl'>
                           <p className='text-[10px] md:text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Espécie</p>
                           <div className='flex items-center gap-2 text-sm md:text-base font-bold text-gray-900'>
                              {pet.specie === 'cão' ? <FaDog className="text-gray-400" /> : <FaCat className="text-gray-400" />}
                              <span className="capitalize">{pet.specie}</span>
                           </div>
                        </div>
                        <div className='bg-gray-50 border border-gray-100 p-3 rounded-xl'>
                           <p className='text-[10px] md:text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Local</p>
                           <div className='flex items-center gap-2 text-sm md:text-base font-bold text-gray-900 truncate'>
                              <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                              <span className="truncate">{pet.city}/{pet.state}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {pet.vaccinated && (
                     <div className='mb-4'>
                        <span className='bg-green-50 text-green-700 px-4 py-2 md:py-3 rounded-xl text-sm font-medium border border-green-200 flex items-center gap-3 w-full'>
                           <div className="bg-green-100 p-2 rounded-full">
                              <FaSyringe className="text-green-600" />
                           </div>
                           <div>
                              <p className="font-bold text-green-800">Vacinado</p>
                              <p className="text-xs text-green-600">Este pet está com as vacinas em dia</p>
                           </div>
                        </span>
                     </div>
                  )}
               </div>

               <div className='shrink-0 p-4 md:p-6 bg-gray-50 border-t border-gray-100 z-10'>
                  {pet.userName && (
                     <div className='mb-3 flex items-center justify-center gap-2 text-gray-600'>
                        <p className='text-xs md:text-sm'>
                           Responsável: <span className='font-semibold text-gray-900'>{pet.userName}</span>
                        </p>
                     </div>
                  )}
                  <div className='grid grid-cols-2 gap-3'>
                     <button
                        className='bg-green-500 text-white py-3 rounded-xl font-bold text-sm md:text-base hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 active:scale-[0.98]'
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
                        className='bg-focinhando-accent text-white py-3 rounded-xl font-bold text-sm md:text-base hover:bg-focinhando-accent/90 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-[0.98]'
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
               </div>
            </div>
         </div>
      </div>
   )
}

export default PetModal
