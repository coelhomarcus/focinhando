const Stats = () => {
   return (
      <section className='relative bg-[url(./assets/banners/banner3.jpg)] bg-top bg-cover py-20'>
         <div className='absolute inset-0 bg-black/60'></div>

         <div className='container mx-auto px-6 max-w-6xl relative z-10'>
            <div className='text-center mb-12'>
               <h2 className='text-3xl font-bold text-white mb-4'>Nosso impacto</h2>
               <p className='text-gray-200'>Números que contam nossa história</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
               <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                  <div className='text-5xl font-bold text-white mb-2'>150+</div>
                  <div className='text-gray-100 font-medium'>Pets adotados</div>
                  <div className='text-sm text-gray-300 mt-2'>Encontraram um novo lar</div>
               </div>
               <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                  <div className='text-5xl font-bold text-white mb-2'>120+</div>
                  <div className='text-gray-100 font-medium'>Famílias felizes</div>
                  <div className='text-sm text-gray-300 mt-2'>Realizaram uma adoção</div>
               </div>
               <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                  <div className='text-5xl font-bold text-white mb-2'>5</div>
                  <div className='text-gray-100 font-medium'>Cidades atendidas</div>
                  <div className='text-sm text-gray-300 mt-2'>E crescendo</div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Stats
