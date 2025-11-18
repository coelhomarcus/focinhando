const LoadingState = () => {
   return (
      <div className='flex flex-col items-center justify-center py-20'>
         <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600'></div>
         <p className='mt-4 text-sm text-gray-600'>Carregando publicações...</p>
      </div>
   )
}

export default LoadingState
