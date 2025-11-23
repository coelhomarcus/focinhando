import type { AdminTabsProps } from '../types'
import { FaEnvelope, FaEdit, FaList } from 'react-icons/fa'
import { IoPaw } from 'react-icons/io5'

const AdminTabs = ({ activeTab, setActiveTab, contactsCount }: AdminTabsProps) => {
   return (
      <div className='mb-6'>
         <div className='bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto'>
            <div className='flex gap-1 min-w-max'>
               <button
                  onClick={() => setActiveTab('manage-pets')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'manage-pets'
                     ? 'bg-focinhando-accent text-white shadow-sm'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                     }`}
               >
                  <FaList className='shrink-0' />
                  <span className='hidden sm:inline'>Gerenciar Pets</span>
                  <span className='sm:hidden'>Pets</span>
               </button>
               <button
                  onClick={() => setActiveTab('pets')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'pets'
                     ? 'bg-focinhando-accent text-white shadow-sm'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                     }`}
               >
                  <IoPaw className='shrink-0' />
                  <span className='hidden sm:inline'>Cadastrar Pet</span>
                  <span className='sm:hidden'>Novo Pet</span>
               </button>
               <button
                  onClick={() => setActiveTab('manage-publications')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'manage-publications'
                     ? 'bg-focinhando-accent text-white shadow-sm'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                     }`}
               >
                  <FaList className='shrink-0' />
                  <span className='hidden sm:inline'>Gerenciar Publicações</span>
                  <span className='sm:hidden'>Posts</span>
               </button>
               <button
                  onClick={() => setActiveTab('publications')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'publications'
                     ? 'bg-focinhando-accent text-white shadow-sm'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                     }`}
               >
                  <FaEdit className='shrink-0' />
                  <span className='hidden sm:inline'>Nova Publicação</span>
                  <span className='sm:hidden'>Novo Post</span>
               </button>
               <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeTab === 'contacts'
                     ? 'bg-focinhando-accent text-white shadow-sm'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                     }`}
               >
                  <FaEnvelope className='shrink-0' />
                  <span>Contatos</span>
                  {contactsCount > 0 && (
                     <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                           }`}
                     >
                        {contactsCount}
                     </span>
                  )}
               </button>
            </div>
         </div>
      </div>
   )
}

export default AdminTabs
