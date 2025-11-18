import { FaDog, FaCat, FaBirthdayCake, FaMapMarkerAlt, FaMars, FaVenus } from 'react-icons/fa'
import type { Pet } from '../types'
import { calculateAge } from '../utils'

interface PetCardProps {
   pet: Pet
   onClick: (pet: Pet) => void
}

const PetCard = ({ pet, onClick }: PetCardProps) => {
   return (
      <div
         className='group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-focinhando-accent'
         onClick={() => onClick(pet)}
      >
         <div className='relative h-56 overflow-hidden bg-gray-100'>
            <img
               src={pet.img}
               alt={pet.name}
               className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            {/* Badge de espécie */}
            <div className='absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-md flex items-center gap-1'>
               {pet.specie === 'cão' ? <FaDog /> : <FaCat />}
               <span className='capitalize'>{pet.specie === "cão" ? "Cachorro" : "Gato"}</span>
            </div>

            {/* Badge de vacinação */}
            {pet.vaccinated && (
               <div className='absolute top-3 right-3 bg-green-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1'>
                  <span>Vacinado</span>
               </div>
            )}
         </div>

         <div className='p-5'>
            <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-focinhando-accent transition-colors'>{pet.name}</h3>

            <div className='space-y-2 mb-4'>
               <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <FaBirthdayCake className='text-gray-400' />
                  <span>{calculateAge(pet.age)}</span>
               </div>
               <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <FaMapMarkerAlt className='text-gray-400' />
                  <span>{pet.city} - {pet.state}</span>
               </div>
               <div className='flex items-center gap-2 text-sm text-gray-600'>
                  {pet.sex === 'macho' ? <FaMars className='text-gray-400' /> : <FaVenus className='text-gray-400' />}
                  <span className='capitalize'>{pet.sex}</span>
               </div>
            </div>

            <button className='w-full mt-2 bg-focinhando-accent/10 text-focinhando-accent py-2.5 rounded-xl font-semibold text-sm group-hover:bg-focinhando-accent group-hover:text-white transition-all duration-300'>
               Ver detalhes
            </button>
         </div>
      </div>
   )
}

export default PetCard
