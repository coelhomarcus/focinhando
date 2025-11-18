import { FaHome, FaHeart, FaHandshake } from 'react-icons/fa'

const Mission = () => {
   return (
      <section className='py-20 bg-white'>
         <div className='container mx-auto px-6 max-w-6xl'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
               <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaHome className="text-blue-600" />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossa missão</h3>
                  <p className='text-gray-600 leading-relaxed'>
                     Conectar pessoas com pets que precisam de um lar, facilitando adoções responsáveis e seguras.
                  </p>
               </div>
               <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaHeart className="text-red-600" />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossa visão</h3>
                  <p className='text-gray-600 leading-relaxed'>
                     Um mundo onde todo animal tenha uma família amorosa e a adoção seja simples e acessível.
                  </p>
               </div>
               <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                  <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                     <FaHandshake className="text-green-600" />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossos valores</h3>
                  <p className='text-gray-600 leading-relaxed'>
                     Transparência, responsabilidade e foco no bem-estar dos animais em primeiro lugar.
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Mission
