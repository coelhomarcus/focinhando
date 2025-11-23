import { FaExclamationTriangle } from 'react-icons/fa'
import HeroSection from './HeroSection'
import type { IncompleteProfileWarningProps } from '../types'


const IncompleteProfileWarning = ({ onNavigateHome, onNavigateProfile }: IncompleteProfileWarningProps) => {
   return (
      <div className='min-h-screen bg-gray-50'>
         <HeroSection
            icon={<FaExclamationTriangle className='text-4xl text-white' />}
            title='Perfil Incompleto'
            description='Complete seu cadastro para continuar com o registro do pet'
         />

         <section className='py-8 sm:py-12'>
            <div className='container mx-auto px-4 sm:px-6 max-w-3xl'>
               <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                  <div className='p-6 sm:p-8'>
                     {/* Main Message */}
                     <div className='mb-6'>
                        <p className='text-gray-700 mb-3 text-sm sm:text-base'>
                           Para cadastrar um pet para adoção, você precisa completar seu perfil com informações adicionais.
                        </p>
                        <p className='text-gray-600 text-xs sm:text-sm'>
                           Isso é necessário para que possamos identificar e validar seus pets cadastrados, garantindo a segurança e confiabilidade da plataforma.
                        </p>
                     </div>

                     {/* Steps Card */}
                     <div className='bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 border border-gray-200'>
                        <h3 className='font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm sm:text-base'>
                           <span className='w-6 h-6 rounded-full bg-focinhando-accent text-white flex items-center justify-center text-xs font-bold shrink-0'>
                              ✓
                           </span>
                           Próximos passos
                        </h3>
                        <div className='space-y-3'>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5 shrink-0'>1.</span>
                              <p className='text-gray-700 text-xs sm:text-sm'>Acesse sua página de perfil</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5 shrink-0'>2.</span>
                              <p className='text-gray-700 text-xs sm:text-sm'>Preencha as informações adicionais (telefone, cidade, estado, data de nascimento)</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5 shrink-0'>3.</span>
                              <p className='text-gray-700 text-xs sm:text-sm'>Clique em "Salvar Alterações"</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5 shrink-0'>4.</span>
                              <p className='text-gray-700 text-xs sm:text-sm'>Retorne aqui para cadastrar seu pet</p>
                           </div>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className='flex flex-col sm:flex-row gap-3'>
                        <button
                           onClick={onNavigateHome}
                           className='px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all text-sm sm:text-base'
                        >
                           Voltar para Home
                        </button>
                        <button
                           onClick={onNavigateProfile}
                           className='flex-1 px-6 py-3 rounded-lg font-semibold bg-focinhando-accent text-white hover:bg-focinhando-accent/90 transition-all shadow-sm hover:shadow-md text-sm sm:text-base'
                        >
                           Completar Perfil Agora
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default IncompleteProfileWarning
