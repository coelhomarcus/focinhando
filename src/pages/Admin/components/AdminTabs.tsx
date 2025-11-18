import type { TabType } from '../types'

interface AdminTabsProps {
   activeTab: TabType
   setActiveTab: (tab: TabType) => void
   contactsCount: number
}

const AdminTabs = ({ activeTab, setActiveTab, contactsCount }: AdminTabsProps) => {
   return (
      <div className='bg-white rounded-xl border border-gray-200 p-1.5 mb-6 inline-flex gap-1'>
         <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeTab === 'contacts'
                  ? 'bg-focinhando-accent text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
               }`}
         >
            <span>📧</span>
            <span>Contatos</span>
            {contactsCount > 0 && (
               <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                     }`}
               >
                  {contactsCount}
               </span>
            )}
         </button>
         <button
            onClick={() => setActiveTab('pets')}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeTab === 'pets'
                  ? 'bg-focinhando-accent text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
               }`}
         >
            <span>🐾</span>
            <span>Cadastrar Pet</span>
         </button>
         <button
            onClick={() => setActiveTab('publications')}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeTab === 'publications'
                  ? 'bg-focinhando-accent text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
               }`}
         >
            <span>📝</span>
            <span>Nova Publicação</span>
         </button>
      </div>
   )
}

export default AdminTabs
