import { FaSyringe } from 'react-icons/fa'
import type { PetForm } from '../types'

interface PetFormFieldsProps {
   petForm: PetForm
   setPetForm: (form: PetForm) => void
}

const PetFormFields = ({ petForm, setPetForm }: PetFormFieldsProps) => {
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
         {/* Nome */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Nome do pet <span className='text-red-500'>*</span>
            </label>
            <input
               type='text'
               value={petForm.name}
               onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
               required
               placeholder='Ex: Max, Luna, Bob...'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Imagem URL */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               URL da Imagem <span className='text-red-500'>*</span>
            </label>
            <input
               type='url'
               value={petForm.img}
               onChange={(e) => setPetForm({ ...petForm, img: e.target.value })}
               required
               placeholder='https://exemplo.com/foto.jpg'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Data de Nascimento */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Data de nascimento <span className='text-red-500'>*</span>
            </label>
            <input
               type='date'
               value={petForm.age}
               onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
               required
               max={new Date().toISOString().split('T')[0]}
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Espécie */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Espécie <span className='text-red-500'>*</span>
            </label>
            <select
               value={petForm.specie}
               onChange={(e) => setPetForm({ ...petForm, specie: e.target.value })}
               required
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white'
            >
               <option value='cão'>Cão</option>
               <option value='gato'>Gato</option>
            </select>
         </div>

         {/* Raça */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Raça <span className='text-red-500'>*</span>
            </label>
            <input
               type='text'
               value={petForm.race}
               onChange={(e) => setPetForm({ ...petForm, race: e.target.value })}
               required
               placeholder='Ex: Labrador, SRD, Siamês...'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Sexo */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Sexo <span className='text-red-500'>*</span>
            </label>
            <select
               value={petForm.sex}
               onChange={(e) => setPetForm({ ...petForm, sex: e.target.value })}
               required
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition bg-white'
            >
               <option value='macho'>Macho</option>
               <option value='fêmea'>Fêmea</option>
            </select>
         </div>

         {/* Peso */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Peso (kg) <span className='text-red-500'>*</span>
            </label>
            <input
               type='number'
               value={petForm.weight || ''}
               onChange={(e) => setPetForm({ ...petForm, weight: Number(e.target.value) })}
               required
               min='0.1'
               step='0.1'
               placeholder='Ex: 15.5'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Cidade */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Cidade <span className='text-red-500'>*</span>
            </label>
            <input
               type='text'
               value={petForm.city}
               onChange={(e) => setPetForm({ ...petForm, city: e.target.value })}
               required
               placeholder='Ex: Belém'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition'
            />
         </div>

         {/* Estado */}
         <div>
            <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
               Estado <span className='text-red-500'>*</span>
            </label>
            <input
               type='text'
               value={petForm.state}
               onChange={(e) => setPetForm({ ...petForm, state: e.target.value.toUpperCase() })}
               required
               maxLength={2}
               placeholder='PA'
               className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition uppercase'
            />
         </div>

         {/* Vacinado */}
         <div className='flex items-center h-full pt-6 sm:pt-8'>
            <label className='flex items-center gap-3 cursor-pointer group'>
               <div className='relative'>
                  <input
                     type='checkbox'
                     checked={petForm.vaccinated}
                     onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.checked })}
                     className='w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-300 text-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 cursor-pointer'
                  />
               </div>
               <span className='text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-focinhando-accent transition-colors flex items-center gap-2'>
                  <FaSyringe className='text-focinhando-accent' />
                  Pet vacinado
               </span>
            </label>
         </div>
      </div>
   )
}

export default PetFormFields
