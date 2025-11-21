interface AlertMessageProps {
   type: 'error' | 'success'
   message: string
}

const AlertMessage = ({ type, message }: AlertMessageProps) => {
   const isError = type === 'error'

   return (
      <div className={`mb-6 p-4 ${isError ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'} border-l-4 rounded-r`}>
         <p className='text-sm font-medium'>{message}</p>
      </div>
   )
}

export default AlertMessage
