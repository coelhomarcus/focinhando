import { FaUser, FaEdit, FaTimes } from 'react-icons/fa'
import type { User, UserComplement, EditData } from '../types'
import EditForm from './EditForm'
import InfoDisplay from './InfoDisplay'

interface PersonalInfoCardProps {
   user: User | null
   complement: UserComplement | null
   editing: boolean
   setEditing: (editing: boolean) => void
   editData: EditData
   setEditData: (data: EditData) => void
   error: string
   saveSuccess: boolean
   onSave: () => void
}

const PersonalInfoCard = ({
   user,
   complement,
   editing,
   setEditing,
   editData,
   setEditData,
   error,
   saveSuccess,
   onSave
}: PersonalInfoCardProps) => {
   return (
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8'>
         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2'>
               <FaUser className='text-focinhando-accent' />
               Informações Pessoais
            </h3>
            <button
               onClick={() => setEditing(!editing)}
               className='w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-focinhando-accent/10 text-focinhando-accent rounded-lg font-medium hover:bg-focinhando-accent hover:text-white transition-all text-sm'
            >
               {editing ? <><FaTimes /> Cancelar</> : <><FaEdit /> Editar</>}
            </button>
         </div>

         {editing ? (
            <EditForm
               editData={editData}
               setEditData={setEditData}
               error={error}
               saveSuccess={saveSuccess}
               user={user}
               onSave={onSave}
            />
         ) : (
            <InfoDisplay user={user} complement={complement} />
         )}
      </div>
   )
}

export default PersonalInfoCard
