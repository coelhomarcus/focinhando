import DogIcon from '@/assets/home/dog.png'
import CachorrosIcon from '@/assets/home/cachorros.png'
import GatosIcon from '@/assets/home/gatos.png'
import FilhotesIcon from '@/assets/home/filhotes.png'
import type { FilterType } from '../types'

interface FilterBarProps {
   activeFilter: FilterType
   filteredCount: number
   onFilterChange: (filter: FilterType) => void
}

const FilterBar = ({ activeFilter, filteredCount, onFilterChange }: FilterBarProps) => {
   const filters = [
      { id: 'all' as FilterType, label: 'Todos os pets', icon: DogIcon },
      { id: 'Cão' as FilterType, label: 'Cachorros', icon: CachorrosIcon },
      { id: 'Gato' as FilterType, label: 'Gatos', icon: GatosIcon },
      { id: 'filhote' as FilterType, label: 'Filhotes', icon: FilhotesIcon },
   ]

   return (
      <section className='px-5 py-8 bg-white border-b border-gray-200'>
         <div className='container mx-auto max-w-7xl'>
            <div className='flex items-center justify-between mb-6'>
               <div>
                  <h2 className='text-2xl font-bold text-gray-900'>Encontre seu pet ideal</h2>
                  <p className='text-sm text-gray-600 mt-1'>
                     {filteredCount} {filteredCount === 1 ? 'pet disponível' : 'pets disponíveis'}
                  </p>
               </div>
            </div>

            <div className='flex gap-3 flex-wrap'>
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
         </div>
      </section>
   )
}

export default FilterBar
