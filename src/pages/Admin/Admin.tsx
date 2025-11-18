import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'
import type { Contact, TabType } from './types'
import AdminHeader from './components/AdminHeader'
import AdminTabs from './components/AdminTabs'
import ContactsTab from './components/ContactsTab'
import PetForm from './components/PetForm'
import PublicationForm from './components/PublicationForm'
import PetsManagement from './components/PetsManagement'
import PublicationsManagement from './components/PublicationsManagement'

const Admin = () => {
   const { apiBaseUrl } = useApi()
   const [activeTab, setActiveTab] = useState<TabType>('manage-pets')
   const [contacts, setContacts] = useState<Contact[]>([])
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      if (activeTab === 'contacts') {
         loadContacts()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activeTab])

   const loadContacts = async () => {
      setLoading(true)
      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/contact/all-contacts`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const data = await response.json()

         if (!data.error) {
            setContacts(data.contacts || [])
         } else {
            console.error('Erro ao carregar contatos:', data.error)
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='min-h-screen bg-gray-50'>
         <AdminHeader />

         <div className='container mx-auto px-6 py-8'>
            <AdminTabs
               activeTab={activeTab}
               setActiveTab={setActiveTab}
               contactsCount={contacts.length}
            />

            {activeTab === 'manage-pets' && <PetsManagement apiBaseUrl={apiBaseUrl} />}
            {activeTab === 'manage-publications' && <PublicationsManagement apiBaseUrl={apiBaseUrl} />}
            {activeTab === 'contacts' && <ContactsTab contacts={contacts} loading={loading} />}
            {activeTab === 'pets' && <PetForm apiBaseUrl={apiBaseUrl} />}
            {activeTab === 'publications' && <PublicationForm apiBaseUrl={apiBaseUrl} />}
         </div>
      </div>
   )
}

export default Admin
