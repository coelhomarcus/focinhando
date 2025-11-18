import { FaDollarSign, FaComments, FaMobileAlt } from 'react-icons/fa'

const Features = () => {
   return (
      <section className='py-20 bg-gray-50 border-y border-gray-200'>
         <div className='container mx-auto px-6 max-w-6xl'>
            <div className='text-center mb-12'>
               <h2 className='text-3xl font-bold text-gray-900 mb-4'>Por que escolher o Focinhando?</h2>
               <p className='text-gray-600 max-w-2xl mx-auto'>
                  Uma plataforma pensada para facilitar sua jornada de adoção
               </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
               <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                  <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaDollarSign className="text-green-600" />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-3'>100% Gratuito</h4>
                  <p className='text-gray-600 leading-relaxed text-sm'>
                     Sem taxas ocultas. Nossa missão é facilitar a adoção, não lucrar com ela.
                  </p>
               </div>
               <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaComments className="text-blue-600" />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-3'>Contato Direto</h4>
                  <p className='text-gray-600 leading-relaxed text-sm'>
                     Converse diretamente com os tutores. Sem intermediários ou burocracias.
                  </p>
               </div>
               <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                  <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaMobileAlt className="text-purple-600" />
                  </div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-3'>Interface Simples</h4>
                  <p className='text-gray-600 leading-relaxed text-sm'>
                     Design intuitivo e responsivo. Encontre seu pet em poucos cliques.
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Features
