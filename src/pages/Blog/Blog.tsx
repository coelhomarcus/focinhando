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
            className='relative bg-cover bg-center py-20 border-b border-gray-200'
            style={{
               backgroundImage: `url(${Banner2})`
            }}
         >
            {/* Overlay preto */}
            <div className='absolute inset-0 bg-black/60'></div>

            <div className='container mx-auto px-6 text-center relative z-10'>
               <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6'>
                  <span>📝</span>
                  <span>Blog</span>
               </div>
               <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
                  Dicas e Histórias
               </h1>
               <p className='text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed'>
                  Conteúdos sobre adoção responsável, cuidados com pets e histórias inspiradoras
               </p>
            </div>
         </section>

         {/* Posts Grid */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-6 max-w-7xl'>
               {loading ? (
                  <div className='flex flex-col items-center justify-center py-20'>
                     <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600'></div>
                     <p className='mt-4 text-sm text-gray-600'>Carregando publicações...</p>
                  </div>
               ) : publications.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-20'>
                     <div className='bg-blue-50 rounded-full p-6 mb-4'>
                        <span className='text-4xl'>📭</span>
                     </div>
                     <p className='text-xl font-medium text-gray-900 mb-1'>
                        Nenhuma publicação encontrada
                     </p>
                     <p className='text-sm text-gray-600'>
                        Novos conteúdos em breve
                     </p>
                  </div>
               ) : (
                  <div>
                     <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Últimas Publicações</h2>
                        <p className='text-gray-600'>{publications.length} {publications.length === 1 ? 'artigo disponível' : 'artigos disponíveis'}</p>
                     </div>

                     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {publications.map((publication) => (
                           <article
                              key={publication.id}
                              onClick={() => setSelectedPublication(publication)}
                              className='group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer'
                           >
                              <div className='relative h-56 overflow-hidden bg-blue-50'>
                                 <img
                                    src={publication.img}
                                    alt={publication.title}
                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                 />
                                 <div className='absolute inset-0 bg-linear-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                 <span className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg'>
                                    {publication.topic}
                                 </span>
                              </div>
                              <div className='p-6 bg-linear-to-b from-white to-blue-50/30'>
                                 <h3 className='text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                                    {publication.title}
                                 </h3>
                                 <p className='text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed'>
                                    {getExcerpt(publication.text)}
                                 </p>
                                 <div className='flex justify-between items-center pt-4 border-t border-blue-100'>
                                    <span className='text-xs text-gray-500'>
                                       {formatDate(publication.createdAt)}
                                    </span>
                                    <span className='text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors'>
                                       Ler mais →
                                    </span>
                                 </div>
                              </div>
                           </article>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </section>

         {/* Modal for Post Details */}
         {selectedPublication && (
            <div
               className='fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'
               onClick={() => setSelectedPublication(null)}
            >
               <div
                  className='bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col border border-blue-100'
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Modal Header - Fixo */}
                  <div className='sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 text-white p-8 rounded-t-2xl shadow-lg'>
                     <button
                        onClick={() => setSelectedPublication(null)}
                        className='absolute top-6 right-6 text-white hover:text-blue-100 text-3xl font-light leading-none w-10 h-10 flex items-center justify-center transition-colors bg-white/20 rounded-full hover:bg-white/30'
                        aria-label='Fechar'
                     >
                        ×
                     </button>
                     <div className='pr-12'>
                        <span className='inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4'>
                           {selectedPublication.topic}
                        </span>
                        <h2 className='text-3xl md:text-4xl font-bold mb-3 leading-tight'>
                           {selectedPublication.title}
                        </h2>
                        <div className='flex items-center gap-2 text-sm text-blue-50'>
                           <span>📅</span>
                           <span>{formatDate(selectedPublication.createdAt)}</span>
                        </div>
                     </div>
                  </div>

                  {/* Modal Body - Scrollable */}
                  <div className='flex-1 overflow-y-auto bg-blue-50/30'>
                     <div className='p-8'>
                        <div className='relative h-96 rounded-xl overflow-hidden mb-8 bg-blue-100 border border-blue-200'>
                           <img
                              src={selectedPublication.img}
                              alt={selectedPublication.title}
                              className='w-full h-full object-cover'
                           />
                        </div>
                        <div className='prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed bg-white rounded-lg p-6 shadow-sm border border-blue-100'>
                           {selectedPublication.text}
                        </div>
                     </div>

                     {/* Modal Footer */}
                     <div className='px-8 pb-8'>
                        <button
                           onClick={() => setSelectedPublication(null)}
                           className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md'
                        >
                           Fechar
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Blog
