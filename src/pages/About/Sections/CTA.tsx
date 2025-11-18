import { NavLink } from 'react-router'

const CTA = () => {
   return (
      <section className='py-20 bg-[url(./assets/banners/banner7.jpg)] bg-center bg-cover border-t border-gray-200'>
         <div className='container mx-auto px-6 max-w-4xl text-center'>
            <div className='bg-gray-50 rounded-2xl border border-gray-200 p-12'>
               <h2 className='text-3xl font-bold text-gray-900 mb-4'>Pronto para adotar?</h2>
               <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
                  Encontre seu novo melhor amigo entre dezenas de pets disponíveis para adoção
               </p>
               <div className='flex gap-4 justify-center flex-wrap'>
                  <NavLink
                     to='/'
                     className='bg-focinhando-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-focinhando-accent-dark cursor-pointer transition-colors'
                  >
                     Ver pets disponíveis
                  </NavLink>

                  <NavLink
                     to='/contact'
                     className='bg-white text-gray-900 px-8 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors'
                  >
                     Entre em contato
                  </NavLink>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CTA
