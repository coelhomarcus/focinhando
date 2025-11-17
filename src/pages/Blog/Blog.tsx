import { useState, useEffect } from 'react'
import Banner2 from '@/assets/banners/banner2.jpg'
import { useApi } from '@/hooks/useApi'

interface Publication {
   id: string
   title: string
   text: string
   img: string
   topic: string
   createdAt: string
}

const Blog = () => {
   const { apiBaseUrl } = useApi()
   const [publications, setPublications] = useState<Publication[]>([])
   const [loading, setLoading] = useState(true)
   const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)

   useEffect(() => {
      const loadPublications = async () => {
         setLoading(true)
         try {
            const token = localStorage.getItem('authToken')
            const response = await fetch(`${apiBaseUrl}/publication/all-publications`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            const data = await response.json()

            if (data.error) {
               console.error('Erro ao carregar publicações:', data.error)
               return
            }

            setPublications(data.publications || [])
         } catch (error) {
            console.error('Erro ao conectar com o servidor:', error)
         } finally {
            setLoading(false)
         }
      }

      loadPublications()
   }, [apiBaseUrl])

   const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
         day: 'numeric',
         month: 'long',
         year: 'numeric'
      })
   }

   const getExcerpt = (text: string) => {
      if (!text) return ''
      return text.length > 150 ? text.substring(0, 150) + '...' : text
   }

   return (
      <div className='min-h-screen bg-white'>
         {/* Hero Section */}
         <section
            className='bg-cover bg-center bg-fixed py-16 text-focinhando-white relative'
            style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${Banner2})`
            }}
         >
            <div className='container mx-auto px-5 text-center'>
               <h1 className='text-5xl md:text-6xl font-bold mb-4'>Blog</h1>
               <p className='text-xl md:text-2xl max-w-2xl mx-auto'>
                  Dicas e histórias sobre adoção de pets
               </p>
            </div>
         </section>

         {/* Posts Grid */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-5'>
               {loading ? (
                  <div className='text-center py-20'>
                     <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-focinhando-accent border-t-transparent'></div>
                     <p className='mt-4 text-focinhando-text'>Carregando publicações...</p>
                  </div>
               ) : publications.length === 0 ? (
                  <div className='text-center py-20'>
                     <p className='text-2xl text-focinhando-text'>
                        Nenhuma publicação encontrada no momento.
                     </p>
                  </div>
               ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                     {publications.map((publication) => (
                        <div
                           key={publication.id}
                           onClick={() => setSelectedPublication(publication)}
                           className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-focinhando-border'
                        >
                           <div className='relative h-64 overflow-hidden'>
                              <img
                                 src={publication.img}
                                 alt={publication.title}
                                 className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                              />
                              <span className='absolute top-4 left-4 bg-focinhando-accent text-white px-4 py-2 rounded-full text-sm font-semibold'>
                                 {publication.topic}
                              </span>
                           </div>
                           <div className='p-6'>
                              <h3 className='text-2xl font-bold mb-3 text-focinhando-dark line-clamp-2'>
                                 {publication.title}
                              </h3>
                              <p className='text-focinhando-text mb-4 line-clamp-3'>
                                 {getExcerpt(publication.text)}
                              </p>
                              <div className='flex justify-between items-center text-sm'>
                                 <span className='text-focinhando-text font-medium'>
                                    {formatDate(publication.createdAt)}
                                 </span>
                                 <span className='text-focinhando-accent font-semibold hover:underline'>
                                    Ler mais →
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </section>

         {/* Modal for Post Details */}
         {selectedPublication && (
            <div
               className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn'
               onClick={() => setSelectedPublication(null)}
            >
               <div
                  className='bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp'
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Modal Header */}
                  <div className='bg-linear-to-r from-focinhando-accent to-pink-500 text-white p-8 rounded-t-3xl relative'>
                     <button
                        onClick={() => setSelectedPublication(null)}
                        className='absolute top-4 right-4 text-white hover:text-gray-200 text-4xl font-light leading-none w-10 h-10 flex items-center justify-center transition-colors'
                        aria-label='Fechar'
                     >
                        ×
                     </button>
                     <h2 className='text-3xl md:text-4xl font-bold mb-4 pr-12 leading-tight'>
                        {selectedPublication.title}
                     </h2>
                     <div className='flex gap-6 text-sm opacity-95'>
                        <span>{formatDate(selectedPublication.createdAt)}</span>
                        <span>{selectedPublication.topic}</span>
                     </div>
                  </div>

                  {/* Modal Body */}
                  <div className='p-8'>
                     <img
                        src={selectedPublication.img}
                        alt={selectedPublication.title}
                        className='w-full h-80 object-cover rounded-2xl mb-8'
                     />
                     <div
                        className='prose prose-lg max-w-none text-focinhando-dark whitespace-pre-line'
                        style={{
                           lineHeight: '1.8',
                           color: '#444'
                        }}
                     >
                        {selectedPublication.text}
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Blog
