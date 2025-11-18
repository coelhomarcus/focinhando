const Team = () => {
   return (
      <section className='py-20 bg-gray-50 border-t border-gray-200'>
         <div className='container mx-auto px-6 max-w-6xl text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Nosso time</h2>
            <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
               Pessoas apaixonadas por animais trabalhando para facilitar adoções
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
               <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                     <img
                        src='https://i.pinimg.com/736x/0e/5e/be/0e5ebe933ef39927d95e4f16e07e2dce.jpg'
                        alt='Marcus Coelho'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <h4 className='text-base font-semibold text-gray-900 mb-1'>Marcus Coelho</h4>
                  <p className='text-sm text-focinhando-accent font-medium mb-1'>Fundador</p>
                  <span className='text-xs text-gray-600'>Desenvolvedor Full Stack</span>
               </div>
               <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                     <img
                        src='https://i.pinimg.com/736x/72/7c/75/727c7529d0a7102546390f197c68c05c.jpg'
                        alt='Vitoria Leda'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <h4 className='text-base font-semibold text-gray-900 mb-1'>Vitoria Leda</h4>
                  <p className='text-sm text-focinhando-accent font-medium mb-1'>Fundadora</p>
                  <span className='text-xs text-gray-600'>Desenvolvedora Frontend</span>
               </div>
               <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                     <img
                        src='https://i.pinimg.com/1200x/a1/f7/08/a1f708eac9d21acb7f2768fc6c9fc321.jpg'
                        alt='Angelo Rodrigues'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <h4 className='text-base font-semibold text-gray-900 mb-1'>Angelo Rodrigues</h4>
                  <p className='text-sm text-focinhando-accent font-medium mb-1'>Desenvolvedor</p>
                  <span className='text-xs text-gray-600'>Infraestrutura & Backend</span>
               </div>
               <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                     <img
                        src='https://i.pinimg.com/736x/80/4a/47/804a473e2707172deed466be818f6e31.jpg'
                        alt='Luis Otavio'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <h4 className='text-base font-semibold text-gray-900 mb-1'>Luis Otavio</h4>
                  <p className='text-sm text-focinhando-accent font-medium mb-1'>Desenvolvedor</p>
                  <span className='text-xs text-gray-600'>Suporte & Adoções</span>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Team
