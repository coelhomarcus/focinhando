import { useState } from 'react'
import Banner4 from '@/assets/banners/banner4.webp'
import { useApi } from '@/hooks/useApi'
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaComments, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const Contact = () => {
   const { apiBaseUrl } = useApi()
   const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
   })
   const [loading, setLoading] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSubmitStatus('idle')

      try {
         const token = localStorage.getItem('authToken')

         console.log('📤 Dados sendo enviados:', formData)
         console.log('🔑 Token:', token ? 'Presente' : 'Ausente')

         const response = await fetch(`${apiBaseUrl}/contact/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
         })

         console.log('📥 Status da resposta:', response.status)

         const data = await response.json()
         console.log('📥 Resposta da API:', data)

         if (data.error) {
            setSubmitStatus('error')
            console.error('❌ Erro ao enviar mensagem:', data.error)
         } else {
            setSubmitStatus('success')
            setFormData({
               fullName: '',
               email: '',
               phoneNumber: '',
               subject: '',
               message: ''
            })
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
         setSubmitStatus('error')
      } finally {
         setLoading(false)
         setTimeout(() => setSubmitStatus('idle'), 5000)
      }
   }

   return (
      <div className='min-h-screen bg-white'>
         {/* Hero Section */}
         <section
            className='relative bg-cover bg-center py-20 border-b border-gray-200'
            style={{
               backgroundImage: `url(${Banner4})`
            }}
         >
            {/* Overlay preto */}
            <div className='absolute inset-0 bg-black/60'></div>

            <div className='container mx-auto px-6 text-center relative z-10'>
               <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6'>
                  <FaComments />
                  <span>Entre em contato</span>
               </div>
               <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
                  Estamos aqui para ajudar
               </h1>
               <p className='text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed'>
                  Dúvidas sobre adoção? Quer cadastrar um pet? Nossa equipe está pronta para te atender
               </p>
            </div>
         </section>

         {/* Contact Section */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-6 max-w-7xl'>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                  {/* Contact Info */}
                  <div>
                     <h2 className='text-3xl font-bold mb-4 text-gray-900'>Fale Conosco</h2>
                     <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                        Tem alguma dúvida sobre adoção? Quer cadastrar um pet? Entre em contato conosco!
                     </p>

                     <div className='flex flex-col gap-6'>
                        {/* Email */}
                        <div className='flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                           <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl shrink-0'>
                              <FaEnvelope className="text-blue-600" />
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold mb-1 text-gray-900'>Email</h3>
                              <p className='text-gray-700 font-medium mb-2'>contato@focinhando.com</p>
                              <a
                                 href='mailto:contato@focinhando.com'
                                 className='text-focinhando-accent font-medium text-sm hover:underline'
                              >
                                 Enviar email →
                              </a>
                           </div>
                        </div>

                        {/* WhatsApp */}
                        <div className='flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                           <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl shrink-0'>
                              <FaWhatsapp className="text-green-600" />
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold mb-1 text-gray-900'>WhatsApp</h3>
                              <p className='text-gray-700 font-medium mb-2'>(94) 99999-0000</p>
                              <a
                                 href='https://wa.me/5594999990000?text=Olá! Gostaria de saber mais sobre adoção de pets.'
                                 target='_blank'
                                 rel='noopener noreferrer'
                                 className='text-focinhando-accent font-medium text-sm hover:underline'
                              >
                                 Chamar no WhatsApp →
                              </a>
                           </div>
                        </div>

                        {/* Location */}
                        <div className='flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                           <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl shrink-0'>
                              <FaMapMarkerAlt className="text-purple-600" />
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold mb-1 text-gray-900'>Localização</h3>
                              <p className='text-gray-700 font-medium mb-1'>Marabá - PA</p>
                              <span className='text-sm text-gray-500'>Atendemos todo o estado do Pará</span>
                           </div>
                        </div>

                        {/* Hours */}
                        <div className='flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                           <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl shrink-0'>
                              <FaClock className="text-orange-600" />
                           </div>
                           <div>
                              <h3 className='text-lg font-semibold mb-1 text-gray-900'>Horário de Atendimento</h3>
                              <p className='text-gray-700 font-medium mb-1'>Segunda a sexta: 8h às 18h</p>
                              <span className='text-sm text-gray-500'>Sábado: 8h às 14h</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Contact Form */}
                  <div className='bg-white rounded-xl border border-gray-200 p-8 shadow-sm'>
                     <h2 className='text-3xl font-bold mb-2 text-gray-900'>Envie sua Mensagem</h2>
                     <p className='text-sm text-gray-600 mb-6'>Preencha o formulário e responderemos em breve</p>

                     <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                           <label htmlFor='fullName' className='block mb-2 text-sm font-medium text-gray-700'>
                              Nome Completo <span className='text-red-500'>*</span>
                           </label>
                           <input
                              type='text'
                              id='fullName'
                              name='fullName'
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              placeholder='Seu nome completo'
                              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition text-sm'
                           />
                        </div>

                        <div>
                           <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-700'>
                              Email <span className='text-red-500'>*</span>
                           </label>
                           <input
                              type='email'
                              id='email'
                              name='email'
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder='seu@email.com'
                              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition text-sm'
                           />
                        </div>

                        <div>
                           <label htmlFor='phoneNumber' className='block mb-2 text-sm font-medium text-gray-700'>
                              Telefone <span className='text-gray-400 text-xs'>(opcional)</span>
                           </label>
                           <input
                              type='tel'
                              id='phoneNumber'
                              name='phoneNumber'
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder='(00) 12345-6789'
                              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition text-sm'
                           />
                        </div>

                        <div>
                           <label htmlFor='subject' className='block mb-2 text-sm font-medium text-gray-700'>
                              Assunto <span className='text-red-500'>*</span>
                           </label>
                           <select
                              id='subject'
                              name='subject'
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition bg-white text-sm'
                           >
                              <option value=''>Selecione um assunto</option>
                              <option value='Quero adotar um pet'>Quero adotar um pet</option>
                              <option value='Quero cadatrar um pet'>Quero cadastrar um pet</option>
                              <option value='Dúvidas gerais'>Dúvidas gerais</option>
                              <option value='Sugestões'>Sugestões</option>
                              <option value='Outro'>Outro</option>
                           </select>
                        </div>

                        <div>
                           <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-700'>
                              Mensagem <span className='text-red-500'>*</span>
                           </label>
                           <textarea
                              id='message'
                              name='message'
                              value={formData.message}
                              onChange={handleChange}
                              required
                              minLength={10}
                              rows={5}
                              placeholder='Conte-nos como podemos ajudar... (mínimo 10 caracteres)'
                              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-focinhando-accent/50 focus:outline-none transition resize-none text-sm'
                           />
                           <p className='text-xs text-gray-500 mt-1'>Mínimo de 10 caracteres</p>
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                           <div className='bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3'>
                              <FaCheckCircle className='text-xl' />
                              <span className='text-sm font-medium'>Mensagem enviada com sucesso! Responderemos em breve.</span>
                           </div>
                        )}
                        {submitStatus === 'error' && (
                           <div className='bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3'>
                              <FaTimesCircle className='text-xl' />
                              <span className='text-sm font-medium'>Erro ao enviar. Tente novamente.</span>
                           </div>
                        )}

                        <button
                           type='submit'
                           disabled={loading}
                           className={`w-full px-6 py-3 rounded-lg font-medium text-sm transition-all ${loading
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-focinhando-accent text-white hover:bg-focinhando-accent-dark cursor-pointer active:scale-[0.98]'
                              }`}
                        >
                           {loading ? (
                              <span className='flex items-center justify-center gap-2'>
                                 <span className='inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></span>
                                 Enviando...
                              </span>
                           ) : (
                              'Enviar Mensagem'
                           )}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </section>

         {/* Additional Info Section */}
         <section className='py-20 bg-gray-50 border-t border-gray-200'>
            <div className='container mx-auto px-6 max-w-4xl text-center'>
               <div className='bg-white rounded-2xl border border-gray-200 p-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                     Tem dúvidas sobre o processo de adoção?
                  </h2>
                  <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
                     Nossa equipe está pronta para te ajudar em todas as etapas. Entre em contato pelos nossos canais
                  </p>
                  <div className='flex flex-wrap justify-center gap-4'>
                     <a
                        href='https://wa.me/5594999990000'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors'
                     >
                        <FaWhatsapp />
                        <span>Falar no WhatsApp</span>
                     </a>
                     <a
                        href='mailto:contato@focinhando.com'
                        className='inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-medium hover:border-gray-400 transition-colors'
                     >
                        <FaEnvelope />
                        <span>Enviar Email</span>
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Contact
