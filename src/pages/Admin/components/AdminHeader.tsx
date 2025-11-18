const AdminHeader = () => {
   return (
      <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
         <div className='container mx-auto px-6 py-4'>
            <div className='flex items-center justify-between'>
               <div>
                  <h1 className='text-2xl font-bold text-gray-900'>Dashboard Admin</h1>
                  <p className='text-sm text-gray-600 mt-0.5'>Gerencie pets, publicações e contatos</p>
               </div>
               <div className='flex items-center gap-3'>
                  <span className='bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold'>
                     ● Online
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AdminHeader
