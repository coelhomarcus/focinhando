interface LoadingSpinnerProps {
   message?: string
}

export const LoadingSpinner = ({ message = 'Carregando...' }: LoadingSpinnerProps) => {
   return (
      <div className='flex flex-col items-center justify-center py-16'>
         <div className='inline-block animate-spin rounded-full h-10 w-10 border-3 border-gray-300 border-t-gray-900'></div>
         <p className='text-sm text-gray-600 mt-4'>{message}</p>
      </div>
   )
}

interface EmptyStateProps {
   icon: string
   title: string
   description: string
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
   return (
      <div className='flex flex-col items-center justify-center py-16'>
         <div className='bg-gray-100 rounded-full p-6 mb-4'>
            <span className='text-4xl'>{icon}</span>
         </div>
         <p className='text-gray-900 font-medium mb-1'>{title}</p>
         <p className='text-sm text-gray-600'>{description}</p>
      </div>
   )
}

interface StatusMessageProps {
   type: 'success' | 'error'
   message: string
}

export const StatusMessage = ({ type, message }: StatusMessageProps) => {
   const isSuccess = type === 'success'

   return (
      <div
         className={`${isSuccess
               ? 'bg-green-50 border-green-200 text-green-800'
               : 'bg-red-50 border-red-200 text-red-800'
            } border px-4 py-3 rounded-lg flex items-center gap-3`}
      >
         <span className='text-xl'>{isSuccess ? '✓' : '✕'}</span>
         <span className='text-sm font-medium'>{message}</span>
      </div>
   )
}
