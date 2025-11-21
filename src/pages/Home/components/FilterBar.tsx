import DogIcon from '@/assets/home/dog.png'
import CachorrosIcon from '@/assets/home/cachorros.png'
import GatosIcon from '@/assets/home/gatos.png'
import FilhotesIcon from '@/assets/home/filhotes.png'
import type { FilterType } from '../types'
import { IoSearchSharp } from "react-icons/io5";

import { RxCross1 } from 'react-icons/rx' 

interface FilterBarProps {
   activeFilter: FilterType
   filteredCount: number
   onFilterChange: (filter: FilterType) => void
   searchQuery: string
   onSearchChange: (query: string) => void
}

const FilterBar = ({ activeFilter, filteredCount, onFilterChange, searchQuery, onSearchChange }: FilterBarProps) => {
   const filters = [
      { id: 'all' as FilterType, label: 'Todos os pets', icon: DogIcon },
      { id: 'Cão' as FilterType, label: 'Cachorros', icon: CachorrosIcon },
      { id: 'Gato' as FilterType, label: 'Gatos', icon: GatosIcon },
      { id: 'filhote' as FilterType, label: 'Filhotes', icon: FilhotesIcon },
   ]

   return (
      <section className='px-5 py-8 bg-white border-b border-gray-200'>
         <div className='container mx-auto max-w-7xl flex flex-col items-center justify-center text-center'>
            <div className='flex items-center justify-between mb-6'>
               <div>
                  <h2 className='text-2xl font-bold text-gray-900'>Encontre seu Pet</h2>
                  <p className='text-sm text-gray-600 mt-1'>
                     {filteredCount} {filteredCount === 1 ? 'pet disponível' : 'pets disponíveis'}
                  </p>
               </div>
            </div>

            <div className='flex gap-3 justify-center flex-wrap'>
               {filters.map((filter) => (
                  <button
                     key={filter.id}
                     className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeFilter === filter.id
                           ? 'bg-focinhando-accent text-white shadow-md scale-105'
                           : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-focinhando-accent hover:text-focinhando-accent hover:shadow-sm'
                        }`}
                     onClick={() => onFilterChange(filter.id)}
                  >
                     <img
                        src={filter.icon}
                        alt={filter.label}
                        className={`w-5 h-5 transition-transform duration-200 ${activeFilter === filter.id ? '' : 'group-hover:scale-110'
                           }`}
                     />
                     <span>{filter.label}</span>
                     {activeFilter === filter.id && (
                        <span className='ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold'>
                           {filteredCount}
                        </span>
                     )}
                  </button>
               ))}
            </div>

            <div className='mt-6 max-w-[700px] w-full'>
               <div className='relative '>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                     <IoSearchSharp />
                  </div>
                  <input
                     type='text'
                     placeholder='Buscar por nome ou raça...'
                     value={searchQuery}
                     onChange={(e) => onSearchChange(e.target.value)}
                     className='w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 transition-all duration-200'
                  />
                  {searchQuery && (
                     <button
                        onClick={() => onSearchChange('')}
                        className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                     >
                        <RxCross1 />
                     </button>
                  )}
               </div>
            </div>
         </div>
      </section>
   )
}

export default FilterBar
