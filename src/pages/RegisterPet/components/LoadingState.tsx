const LoadingState = () => {
   return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
         <div className='flex flex-col items-center gap-4'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-focinhando-accent border-t-transparent'></div>
            <p className='text-lg text-gray-600 font-medium'>Verificando seu perfil...</p>
         </div>
      </div>
   )
}

export default LoadingState
