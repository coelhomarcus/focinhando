import type { Contact } from '../types'
import { LoadingSpinner } from './SharedComponents'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { IoMailOpenOutline } from 'react-icons/io5'

interface ContactsTabProps {
   contacts: Contact[]
   loading: boolean
}

const ContactsTab = ({ contacts, loading }: ContactsTabProps) => {
   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleString('pt-BR')
   }

   return (
      <div className='bg-white rounded-xl border border-gray-200'>
         <div className='px-6 py-5 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>Mensagens de Contato</h2>
            <p className='text-sm text-gray-600 mt-1'>Visualize e gerencie as mensagens recebidas</p>
         </div>

         {loading ? (
            <LoadingSpinner message='Carregando contatos...' />
         ) : contacts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
               <IoMailOpenOutline className='text-5xl text-gray-400 mb-3' />
               <p className='text-lg font-medium text-gray-900 mb-1'>Nenhum contato encontrado</p>
               <p className='text-sm text-gray-600'>As mensagens aparecerão aqui</p>
            </div>
         ) : (
            <div className='divide-y divide-gray-200'>
               {contacts.map((contact) => (
                  <div key={contact.id} className='px-6 py-5 hover:bg-gray-50 transition-colors'>
                     <div className='flex items-start justify-between mb-3'>
                        <div className='flex-1'>
                           <div className='flex items-center gap-3 mb-2'>
                              <h3 className='text-base font-semibold text-gray-900'>{contact.fullName}</h3>
                              <span className='bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium'>
                                 {contact.subject}
                              </span>
                           </div>
                           <div className='flex items-center gap-4 text-sm text-gray-600'>
                              <span className='flex items-center gap-1.5'>
                                 <FaEnvelope />
                                 {contact.email}
                              </span>
                              {contact.phoneNumber && (
                                 <span className='flex items-center gap-1.5'>
                                    <FaPhone />
                                    {contact.phoneNumber}
                                 </span>
                              )}
                           </div>
                        </div>
                        <span className='text-xs text-gray-500 whitespace-nowrap ml-4'>
                           {formatDate(contact.createdAt)}
                        </span>
                     </div>
                     <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-200'>
                        {contact.message}
                     </p>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default ContactsTab
