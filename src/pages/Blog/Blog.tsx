import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'
import type { Publication } from './types'

import BlogHero from './components/BlogHero'
import BlogGrid from './components/BlogGrid'
import BlogModal from './components/BlogModal'
import LoadingState from '../../components/LoadingState'
import EmptyState from './components/EmptyState'   

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
         <BlogHero />

         {/* Posts Grid */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-6 max-w-7xl'>
               {loading ? (
                  <LoadingState text="Carregando publicações" />
               ) : publications.length === 0 ? (
                  <EmptyState />
               ) : (
                  <BlogGrid
                     publications={publications}
                     onSelectPublication={setSelectedPublication}
                     formatDate={formatDate}
                     getExcerpt={getExcerpt}
                  />
               )}
            </div>
         </section>

         <BlogModal
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
            formatDate={formatDate}
         />
      </div>
   )
}

export default Blog
