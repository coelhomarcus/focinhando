import { IoPaw } from 'react-icons/io5'
import type { Pet, FilterType } from '../types'
import PetCard from './PetCard'
import { FaSpinner } from "react-icons/fa";

interface PetGridProps {
   pets: Pet[]
   loading: boolean
   activeFilter: FilterType
   onPetClick: (pet: Pet) => void
}

const PetGrid = ({ pets, loading, activeFilter, onPetClick }: PetGridProps) => {
   const getTitle = () => {
      switch (activeFilter) {
         case 'all':
            return 'Todos os pets disponíveis'
         case 'Cão':
            return 'Cachorros disponíveis'
         case 'Gato':
            return 'Gatos disponíveis'
         case 'filhote':
            return 'Filhotes disponíveis'
         default:
            return 'Pets disponíveis'
      }
   }

   if (loading) {
      return (
         <section className='container mx-auto max-w-7xl px-5 py-12'>
            <div className='flex flex-col items-center py-20'>
               <FaSpinner className='animate-spin w-16 h-16 text-focinhando-accent'/>
               <p className='text-xl text-gray-600 mt-4'>Carregando pets...</p>
            </div>
         </section>
      )
   }

   return (
      <section className='container mx-auto max-w-7xl px-5 py-12'>
         <div className='flex items-center justify-between mb-8'>
            <div>
               <h2 className='text-3xl font-bold text-gray-900'>{getTitle()}</h2>
               <p className='text-gray-600 mt-1'>Encontre seu novo melhor amigo</p>
            </div>
         </div>

         {pets.length === 0 ? (
            <div className='text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300'>
               <IoPaw className='text-6xl mx-auto mb-4 text-gray-400' />
               <p className='text-2xl font-semibold text-gray-700 mb-2'>Nenhum pet encontrado</p>
               <p className='text-gray-500'>Tente outro filtro ou volte mais tarde</p>
            </div>
         ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
               {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} onClick={onPetClick} />
               ))}
            </div>
         )}
      </section>
   )
}

export default PetGrid
