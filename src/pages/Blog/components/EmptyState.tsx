import { IoMailOpenOutline } from 'react-icons/io5'

const EmptyState = () => {
   return (
      <div className='flex flex-col items-center justify-center py-20'>
         <div className='bg-blue-50 rounded-full p-6 mb-4'>
            <IoMailOpenOutline className='text-4xl text-blue-600' />
         </div>
         <p className='text-xl font-medium text-gray-900 mb-1'>
            Nenhuma publicação encontrada
         </p>
         <p className='text-sm text-gray-600'>
            Novos conteúdos em breve
         </p>
      </div>
   )
}

export default EmptyState
