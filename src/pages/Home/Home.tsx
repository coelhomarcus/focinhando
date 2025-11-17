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
         <section className='flex justify-center gap-8 my-10 px-5'>
            <div
               className={`flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition hover:bg-focinhando-gray ${activeFilter === 'all' ? 'bg-focinhando-accent text-focinhando-white' : 'bg-focinhando-gray'}`}
               onClick={() => handleFilter('all')}
            >
               <img src={DogIcon} alt="Todos" className='w-12 h-12' />
               <p className='font-semibold'>Todos</p>
            </div>

            <div
               className={`flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition hover:bg-focinhando-gray ${activeFilter === 'Cão' ? 'bg-focinhando-accent text-focinhando-white' : 'bg-focinhando-gray'}`}
               onClick={() => handleFilter('Cão')}
            >
               <img src={CachorrosIcon} alt="Cachorros" className='w-12 h-12' />
               <p className='font-semibold'>Cachorros</p>
            </div>

            <div
               className={`flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition hover:bg-focinhando-gray ${activeFilter === 'Gato' ? 'bg-focinhando-accent text-focinhando-white' : 'bg-focinhando-gray'}`}
               onClick={() => handleFilter('Gato')}
            >
               <img src={GatosIcon} alt="Gatos" className='w-12 h-12' />
               <p className='font-semibold'>Gatos</p>
            </div>

            <div
               className={`flex flex-col items-center gap-2 p-5 rounded-xl cursor-pointer transition hover:bg-focinhando-gray ${activeFilter === 'filhote' ? 'bg-focinhando-accent text-focinhando-white' : 'bg-focinhando-gray'}`}
               onClick={() => handleFilter('filhote')}
            >
               <img src={FilhotesIcon} alt="Filhotes" className='w-12 h-12' />
               <p className='font-semibold'>Filhotes</p>
            </div>
         </section>

         {/* Cards de Pets */}
         <section className='px-10'>
            <h2 className='text-4xl font-bold mb-8'>Últimos adicionados</h2>

            {loading ? (
               <div className='text-center py-20'>
                  <p className='text-2xl text-focinhando-gray'>Carregando pets...</p>
               </div>
            ) : filteredPets.length === 0 ? (
               <div className='text-center py-20'>
                  <p className='text-2xl text-focinhando-gray'>Nenhum pet encontrado</p>
               </div>
            ) : (
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                  {filteredPets.map(pet => (
                     <div
                        key={pet.id}
                        className='bg-focinhando-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition hover:shadow-2xl hover:scale-105'
                        onClick={() => openModal(pet)}
                     >
                        <div className='h-64 bg-focinhando-gray'>
                           <img
                              src={pet.img}
                              alt={pet.name}
                              className='w-full h-full object-cover'
                           />
                        </div>
                        <div className='p-5'>
                           <h3 className='text-2xl font-bold mb-2'>{pet.name}</h3>
                           <p className='text-focinhando-gray mb-1'>{calculateAge(pet.age)}</p>
                           <p className='text-focinhando-gray mb-3'>📍 {pet.city} - {pet.state}</p>
                           <div className='flex gap-2 flex-wrap'>
                              <span className='bg-focinhando-accent text-focinhando-white px-3 py-1 rounded-full text-sm'>
                                 {pet.sex === 'M' ? 'Macho' : 'Fêmea'}
                              </span>
                              {pet.vaccinated && (
                                 <span className='bg-green-500 text-focinhando-white px-3 py-1 rounded-full text-sm'>
                                    Vacinado
                                 </span>
                              )}
                              <span className='bg-focinhando-gray px-3 py-1 rounded-full text-sm capitalize'>
                                 {pet.specie}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </section>

         {/* Modal de Detalhes */}
         {selectedPet && (
            <div
               className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5'
               onClick={closeModal}
            >
               <div
                  className='bg-focinhando-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className='relative'>
                     <button
                        className='absolute top-5 right-5 text-focinhando-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-opacity-70'
                        onClick={closeModal}
                     >
                        ×
                     </button>
                     <div className='h-96 bg-focinhando-gray'>
                        <img
                           src={selectedPet.img}
                           alt={selectedPet.name}
                           className='w-full h-full object-cover'
                        />
                     </div>
                  </div>

                  <div className='p-8'>
                     <div className='mb-6'>
                        <h2 className='text-4xl font-bold mb-2'>{selectedPet.name}</h2>
                        <p className='text-xl text-focinhando-gray mb-2'>{calculateAge(selectedPet.age)}</p>
                        <p className='text-focinhando-gray mb-4'>📍 {selectedPet.city} - {selectedPet.state}</p>
                        <div className='flex gap-2 flex-wrap'>
                           <span className='bg-focinhando-accent text-focinhando-white px-4 py-2 rounded-full'>
                              {selectedPet.sex === 'M' ? 'Macho' : 'Fêmea'}
                           </span>
                           {selectedPet.vaccinated && (
                              <span className='bg-green-500 text-focinhando-white px-4 py-2 rounded-full'>
                                 Vacinado
                              </span>
                           )}
                        </div>
                     </div>

                     <div className='mb-6'>
                        <h3 className='text-2xl font-bold mb-3'>Sobre o {selectedPet.name}</h3>
                        <p className='text-focinhando-gray leading-relaxed'>{selectedPet.about}</p>
                     </div>

                     <div className='mb-6'>
                        <h3 className='text-2xl font-bold mb-3'>Informações</h3>
                        <div className='grid grid-cols-2 gap-4'>
                           <p><strong>Espécie:</strong> {selectedPet.specie}</p>
                           <p><strong>Raça:</strong> {selectedPet.race}</p>
                           <p><strong>Peso:</strong> {selectedPet.weight} kg</p>
                           <p><strong>Sexo:</strong> {selectedPet.sex === 'M' ? 'Macho' : 'Fêmea'}</p>
                        </div>
                     </div>

                     <button
                        className='w-full bg-focinhando-accent text-focinhando-white py-4 rounded-xl font-bold text-lg hover:bg-focinhando-accent-dark transition'
                        onClick={() => alert('Funcionalidade de contato será implementada em breve!')}
                     >
                        Entrar em contato
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Home
