import { useState, useEffect } from 'react'
import Banner from '@/assets/banners/banner.jpg'
import DogIcon from '@/assets/home/dog.png'
import CachorrosIcon from '@/assets/home/cachorros.png'
import GatosIcon from '@/assets/home/gatos.png'
import FilhotesIcon from '@/assets/home/filhotes.png'
import { useApi } from '@/hooks/useApi'

interface Pet {
   id: string
   name: string
   img: string
   age: Date
   city: string
   state: string
   sex: string
   vaccinated: boolean
   about: string
   specie: string
   race: string
   weight: number
}

const Home = () => {
   const { apiBaseUrl } = useApi()
   const [pets, setPets] = useState<Pet[]>([])
   const [filteredPets, setFilteredPets] = useState<Pet[]>([])
   const [loading, setLoading] = useState(true)
   const [activeFilter, setActiveFilter] = useState('all')
   const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

   useEffect(() => {
      const loadPets = async () => {
         setLoading(true)
         try {
            const response = await fetch(`${apiBaseUrl}/pets`)
            const data = await response.json()

            if (data.error) {
               console.error('Erro ao carregar pets:', data.error)
               return
            }

            setPets(data.pets || [])
            setFilteredPets(data.pets || [])
         } catch (error) {
            console.error('Erro ao conectar com o servidor:', error)
         } finally {
            setLoading(false)
         }
      }

      loadPets()
   }, [apiBaseUrl])

   const handleFilter = (filterType: string) => {
      setActiveFilter(filterType)

      if (filterType === 'all') {
         setFilteredPets(pets)
      } else if (filterType === 'Cão') {
         setFilteredPets(pets.filter(pet => pet.specie === 'cão'))
      } else if (filterType === 'Gato') {
         setFilteredPets(pets.filter(pet => pet.specie === 'gato'))
      } else if (filterType === 'filhote') {
         const oneYearAgo = new Date()
         oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
         setFilteredPets(pets.filter(pet => new Date(pet.age) > oneYearAgo))
      }
   }

   const calculateAge = (birthDate: Date) => {
      const birth = new Date(birthDate)
      const now = new Date()
      const diffMonths = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth()

      if (diffMonths < 12) {
         return `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`
      }
      const years = Math.floor(diffMonths / 12)
      return `${years} ${years === 1 ? 'ano' : 'anos'}`
   }

   const openModal = (pet: Pet) => {
      setSelectedPet(pet)
   }

   const closeModal = () => {
      setSelectedPet(null)
   }

   return (
      <div className='pb-20'>
         {/* Hero Section */}
         <section
            className='h-[400px] bg-cover bg-center flex items-center justify-center text-focinhando-white'
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${Banner})` }}
         >
            <div className='text-center'>
               <h1 className='text-6xl font-bold mb-4'>Encontre seu novo amigo</h1>
               <p className='text-2xl'>Uma plataforma simples para adoção de pets</p>
            </div>
         </section>

         {/* Filtros */}
         <section className='px-5 py-8 bg-white border-b border-gray-200'>
            <div className='container mx-auto max-w-7xl'>
               <div className='flex items-center justify-between mb-6'>
                  <div>
                     <h2 className='text-2xl font-bold text-gray-900'>Encontre seu pet ideal</h2>
                     <p className='text-sm text-gray-600 mt-1'>
                        {filteredPets.length} {filteredPets.length === 1 ? 'pet disponível' : 'pets disponíveis'}
                     </p>
                  </div>
               </div>

               <div className='flex gap-3 flex-wrap'>
                  <button
                     className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeFilter === 'all'
                        ? 'bg-focinhando-accent text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-focinhando-accent hover:text-focinhando-accent hover:shadow-sm'
                        }`}
                     onClick={() => handleFilter('all')}
                  >
                     <img
                        src={DogIcon}
                        alt="Todos"
                        className={`w-5 h-5 transition-transform duration-200 ${activeFilter === 'all' ? '' : 'group-hover:scale-110'}`}
                     />
                     <span>Todos os pets</span>
                     {activeFilter === 'all' && (
                        <span className='ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold'>
                           {filteredPets.length}
                        </span>
                     )}
                  </button>

                  <button
                     className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeFilter === 'Cão'
                        ? 'bg-focinhando-accent text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-focinhando-accent hover:text-focinhando-accent hover:shadow-sm'
                        }`}
                     onClick={() => handleFilter('Cão')}
                  >
                     <img
                        src={CachorrosIcon}
                        alt="Cachorros"
                        className={`w-5 h-5 transition-transform duration-200 ${activeFilter === 'Cão' ? '' : 'group-hover:scale-110'}`}
                     />
                     <span>Cachorros</span>
                     {activeFilter === 'Cão' && (
                        <span className='ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold'>
                           {filteredPets.length}
                        </span>
                     )}
                  </button>

                  <button
                     className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeFilter === 'Gato'
                        ? 'bg-focinhando-accent text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-focinhando-accent hover:text-focinhando-accent hover:shadow-sm'
                        }`}
                     onClick={() => handleFilter('Gato')}
                  >
                     <img
                        src={GatosIcon}
                        alt="Gatos"
                        className={`w-5 h-5 transition-transform duration-200 ${activeFilter === 'Gato' ? '' : 'group-hover:scale-110'}`}
                     />
                     <span>Gatos</span>
                     {activeFilter === 'Gato' && (
                        <span className='ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold'>
                           {filteredPets.length}
                        </span>
                     )}
                  </button>

                  <button
                     className={`group relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeFilter === 'filhote'
                        ? 'bg-focinhando-accent text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-focinhando-accent hover:text-focinhando-accent hover:shadow-sm'
                        }`}
                     onClick={() => handleFilter('filhote')}
                  >
                     <img
                        src={FilhotesIcon}
                        alt="Filhotes"
                        className={`w-5 h-5 transition-transform duration-200 ${activeFilter === 'filhote' ? '' : 'group-hover:scale-110'}`}
                     />
                     <span>Filhotes</span>
                     {activeFilter === 'filhote' && (
                        <span className='ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold'>
                           {filteredPets.length}
                        </span>
                     )}
                  </button>
               </div>
            </div>
         </section>

         {/* Cards de Pets */}
         <section className='container mx-auto max-w-7xl px-5 py-12'>
            <div className='flex items-center justify-between mb-8'>
               <div>
                  <h2 className='text-3xl font-bold text-gray-900'>
                     {activeFilter === 'all' && 'Todos os pets disponíveis'}
                     {activeFilter === 'Cão' && 'Cachorros disponíveis'}
                     {activeFilter === 'Gato' && 'Gatos disponíveis'}
                     {activeFilter === 'filhote' && 'Filhotes disponíveis'}
                  </h2>
                  <p className='text-gray-600 mt-1'>Encontre seu novo melhor amigo</p>
               </div>
            </div>

            {loading ? (
               <div className='text-center py-20'>
                  <div className='inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-focinhando-accent'></div>
                  <p className='text-xl text-gray-600 mt-4'>Carregando pets...</p>
               </div>
            ) : filteredPets.length === 0 ? (
               <div className='text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300'>
                  <div className='text-6xl mb-4'>🐾</div>
                  <p className='text-2xl font-semibold text-gray-700 mb-2'>Nenhum pet encontrado</p>
                  <p className='text-gray-500'>Tente outro filtro ou volte mais tarde</p>
               </div>
            ) : (
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {filteredPets.map((pet) => {
                     return (
                        <div
                           key={pet.id}
                           className='group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-200 hover:border-focinhando-accent'
                           onClick={() => openModal(pet)}
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
                                 <span>{pet.specie === 'cão' ? '🐕' : '🐱'}</span>
                                 <span className='capitalize'>{pet.specie}</span>
                              </div>

                              {/* Badge de vacinação */}
                              {pet.vaccinated && (
                                 <div className='absolute top-3 right-3 bg-green-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1'>
                                    <span>💉</span>
                                    <span>Vacinado</span>
                                 </div>
                              )}
                           </div>

                           <div className='p-5'>
                              <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-focinhando-accent transition-colors'>{pet.name}</h3>

                              <div className='space-y-2 mb-4'>
                                 <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <span className='text-gray-400'>🎂</span>
                                    <span>{calculateAge(pet.age)}</span>
                                 </div>
                                 <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <span className='text-gray-400'>📍</span>
                                    <span>{pet.city} - {pet.state}</span>
                                 </div>
                                 <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <span className='text-gray-400'>{pet.sex === 'macho' ? '♂️' : '♀️'}</span>
                                    <span className='capitalize'>{pet.sex}</span>
                                 </div>
                              </div>

                              <button className='w-full mt-2 bg-focinhando-accent/10 text-focinhando-accent py-2.5 rounded-xl font-semibold text-sm group-hover:bg-focinhando-accent group-hover:text-white transition-all duration-300'>
                                 Ver detalhes
                              </button>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </section>

         {/* Modal de Detalhes */}
         {selectedPet && (
            <div
               className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn'
               onClick={closeModal}
            >
               <div
                  className='bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col'
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Header com imagem */}
                  <div className='relative shrink-0'>
                     <button
                        className='absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:rotate-90 transition-all duration-300 shadow-lg'
                        onClick={closeModal}
                        aria-label='Fechar modal'
                     >
                        ×
                     </button>

                     <div className='h-80 bg-gray-100 relative overflow-hidden'>
                        <img
                           src={selectedPet.img}
                           alt={selectedPet.name}
                           className='w-full h-full object-cover'
                        />

                        {/* Gradient overlay */}
                        <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent'></div>

                        {/* Badges flutuantes */}
                        <div className='absolute top-4 left-4 flex gap-2'>
                           <span className='bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-gray-800 shadow-lg flex items-center gap-1.5'>
                              <span>{selectedPet.specie === 'cão' ? '🐕' : '🐱'}</span>
                              <span className='capitalize'>{selectedPet.specie}</span>
                           </span>
                           {selectedPet.vaccinated && (
                              <span className='bg-green-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1.5'>
                                 <span>Vacinado</span>
                              </span>
                           )}
                        </div>

                        {/* Info sobre a imagem */}
                        <div className='absolute bottom-0 left-0 right-0 p-6'>
                           <h2 className='text-4xl font-bold text-white mb-3 drop-shadow-lg'>{selectedPet.name}</h2>
                           <div className='flex items-center gap-3 flex-wrap'>
                              <span className='bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2'>
                                 <span>🎂</span>
                                 <span>{calculateAge(selectedPet.age)}</span>
                              </span>
                              <span className='bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2'>
                                 <span>📍</span>
                                 <span>{selectedPet.city} - {selectedPet.state}</span>
                              </span>
                              <span className='bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2'>
                                 <span>{selectedPet.sex === 'macho' ? '♂️' : '♀️'}</span>
                                 <span className='capitalize'>{selectedPet.sex}</span>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Conteúdo com scroll */}
                  <div className='flex-1 overflow-y-auto px-6 py-6 bg-white'>
                     {/* Sobre */}
                     <div className='mb-8'>
                        <h3 className='text-xl font-bold text-gray-900 mb-3'>Sobre {selectedPet.name}</h3>
                        <p className='text-gray-600 leading-relaxed'>
                           {selectedPet.about}
                        </p>
                     </div>

                     {/* Informações em Grid */}
                     <div className='mb-6'>
                        <h3 className='text-xl font-bold text-gray-900 mb-4'>Informações</h3>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                           <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                              <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Raça</p>
                              <p className='text-sm font-bold text-gray-900'>{selectedPet.race}</p>
                           </div>
                           <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                              <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Peso</p>
                              <p className='text-sm font-bold text-gray-900'>{selectedPet.weight} kg</p>
                           </div>
                           <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                              <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Idade</p>
                              <p className='text-sm font-bold text-gray-900'>{calculateAge(selectedPet.age)}</p>
                           </div>
                           <div className='bg-gray-50 border border-gray-200 p-4 rounded-xl text-center'>
                              <p className='text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide'>Sexo</p>
                              <p className='text-sm font-bold text-gray-900 capitalize'>{selectedPet.sex}</p>
                           </div>
                        </div>
                     </div>

                     {/* Características */}
                     <div className='mb-6'>
                        <h3 className='text-xl font-bold text-gray-900 mb-4'>Características</h3>
                        <div className='flex flex-wrap gap-2'>
                           <span className='bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200'>
                              {selectedPet.specie === 'cão' ? '🐕 Cachorro' : '🐱 Gato'}
                           </span>
                           <span className='bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200'>
                              {selectedPet.sex === 'macho' ? '♂️ Macho' : '♀️ Fêmea'}
                           </span>
                           {selectedPet.vaccinated && (
                              <span className='bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200'>
                                 💉 Vacinado
                              </span>
                           )}
                           <span className='bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-200'>
                              📍 {selectedPet.city}/{selectedPet.state}
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Footer com CTA */}
                  <div className='shrink-0 p-6 bg-gray-50 border-t border-gray-200'>
                     <button
                        className='w-full bg-focinhando-accent text-white py-3.5 rounded-xl font-semibold text-base hover:bg-focinhando-accent/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2'
                        onClick={() => alert('Funcionalidade de contato será implementada em breve!')}
                     >
                        <span>💌</span>
                        <span>Entrar em contato para adotar</span>
                     </button>
                     <p className='text-center text-xs text-gray-500 mt-3'>
                        Clique para iniciar o processo de adoção
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Home
