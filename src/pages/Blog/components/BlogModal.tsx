import { FaCalendarAlt } from 'react-icons/fa'
import type { BlogModalProps } from '../types'

const BlogModal = ({ publication, onClose, formatDate }: BlogModalProps) => {
   if (!publication) return null

   return (
      <div
         className='fixed inset-0 bg-blue-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'
         onClick={onClose}
      >
         <div
            className='bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col border-4 border-gray-200'
            onClick={(e) => e.stopPropagation()}
         >
            <div className='sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 text-white p-8 rounded-t-2xl shadow-lg'>
               <button
                  onClick={onClose}
                  className='absolute top-6 right-6 text-white hover:text-blue-100 text-3xl font-light leading-none w-10 h-10 flex items-center justify-center transition-colors bg-white/20 rounded-full hover:bg-white/30'
                  aria-label='Fechar'
               >
                  ×
               </button>
               <div className='pr-12'>
                  <span className='inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4'>
                     {publication.topic}
                  </span>
                  <h2 className='text-3xl md:text-4xl font-bold mb-3 leading-tight'>
                     {publication.title}
                  </h2>
                  <div className='flex items-center gap-2 text-sm text-blue-50'>
                     <FaCalendarAlt />
                     <span>{formatDate(publication.createdAt)}</span>
                  </div>
               </div>
            </div>

            <div className='flex-1 overflow-y-auto bg-blue-50/30'>
               <div className='p-8'>
                  <div className='relative h-96 rounded-xl overflow-hidden mb-8 bg-blue-100 border border-blue-200'>
                     <img
                        src={publication.img}
                        alt={publication.title}
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <div className='prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed bg-white rounded-lg p-6 shadow-sm border border-blue-100'>
                     {publication.text}
                  </div>
               </div>

               <div className='px-8 pb-8'>
                  <button
                     onClick={onClose}
                     className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md'
                  >
                     Fechar
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogModal
