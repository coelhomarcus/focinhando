const InfoCard = () => {
   return (
      <div className='mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6'>
         <h3 className='font-semibold text-blue-900 mb-3 flex items-center gap-2 text-sm sm:text-base'>
            <svg className='w-5 h-5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
               <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
            </svg>
            Informações Importantes
         </h3>
         <ul className='text-xs sm:text-sm text-blue-800 space-y-2'>
            <li className='flex items-start gap-2'>
               <span className='shrink-0'>•</span>
               <span>Certifique-se de que todas as informações estão corretas</span>
            </li>
            <li className='flex items-start gap-2'>
               <span className='shrink-0'>•</span>
               <span>Use uma foto clara e de boa qualidade do pet</span>
            </li>
            <li className='flex items-start gap-2'>
               <span className='shrink-0'>•</span>
               <span>Seja honesto sobre o temperamento e necessidades do pet</span>
            </li>
            <li className='flex items-start gap-2'>
               <span className='shrink-0'>•</span>
               <span>Após o cadastro, o pet ficará disponível para adoção</span>
            </li>
         </ul>
      </div>
   )
}

export default InfoCard
