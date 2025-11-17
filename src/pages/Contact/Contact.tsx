import { useState } from 'react'
import Banner4 from '@/assets/banners/banner4.webp'
import { useApi } from '@/hooks/useApi'

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
            className='bg-cover bg-center py-16 text-focinhando-white'
            style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Banner4})`
            }}
         >
            <div className='container mx-auto px-5 text-center'>
               <h1 className='text-5xl md:text-6xl font-bold mb-4'>Entre em Contato</h1>
               <p className='text-xl md:text-2xl max-w-2xl mx-auto'>
                  Estamos aqui para ajudar você a encontrar seu novo melhor amigo
               </p>
            </div>
         </section>

         {/* Contact Section */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-5'>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                  {/* Contact Info */}
                  <div>
                     <h2 className='text-4xl font-bold mb-5 text-focinhando-dark'>Fale Conosco</h2>
                     <p className='text-lg text-focinhando-text mb-8 leading-relaxed'>
                        Tem alguma dúvida sobre adoção? Quer cadastrar um pet? Entre em contato conosco!
                     </p>

                     <div className='flex flex-col gap-6'>
                        {/* Email */}
                        <div className='flex items-start gap-5 p-5 bg-focinhando-gray rounded-2xl border-l-4 border-focinhando-accent'>
                           <div className='text-4xl'>📧</div>
                           <div>
                              <h3 className='text-xl font-semibold mb-1 text-focinhando-dark'>Email</h3>
                              <p className='text-focinhando-text font-semibold mb-2'>contato@focinhando.com</p>
                              <a
                                 href='mailto:contato@focinhando.com'
                                 className='text-focinhando-accent font-semibold text-sm hover:underline'
                              >
                                 Enviar email
                              </a>
                           </div>
                        </div>

                        {/* WhatsApp */}
                        <div className='flex items-start gap-5 p-5 bg-focinhando-gray rounded-2xl border-l-4 border-focinhando-accent'>
                           <div className='text-4xl'>📱</div>
                           <div>
                              <h3 className='text-xl font-semibold mb-1 text-focinhando-dark'>WhatsApp</h3>
                              <p className='text-focinhando-text font-semibold mb-2'>(94) 99999-0000</p>
                              <a
                                 href='https://wa.me/5594999990000?text=Olá! Gostaria de saber mais sobre adoção de pets.'
                                 target='_blank'
                                 rel='noopener noreferrer'
                                 className='text-focinhando-accent font-semibold text-sm hover:underline'
                              >
                                 Chamar no WhatsApp
                              </a>
                           </div>
                        </div>

                        {/* Location */}
                        <div className='flex items-start gap-5 p-5 bg-focinhando-gray rounded-2xl border-l-4 border-focinhando-accent'>
                           <div className='text-4xl'>📍</div>
                           <div>
                              <h3 className='text-xl font-semibold mb-1 text-focinhando-dark'>Localização</h3>
                              <p className='text-focinhando-text font-semibold mb-1'>Marabá - PA</p>
                              <span className='text-sm text-gray-500'>Atendemos todo o estado do Pará</span>
                           </div>
                        </div>

                        {/* Hours */}
                        <div className='flex items-start gap-5 p-5 bg-focinhando-gray rounded-2xl border-l-4 border-focinhando-accent'>
                           <div className='text-4xl'>🕒</div>
                           <div>
                              <h3 className='text-xl font-semibold mb-1 text-focinhando-dark'>Horário de Atendimento</h3>
                              <p className='text-focinhando-text font-semibold mb-1'>Segunda a sexta: 8h às 18h</p>
                              <span className='text-sm text-gray-500'>Sábado: 8h às 14h</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Contact Form */}
                  <div className='bg-focinhando-gray p-8 md:p-10 rounded-3xl shadow-lg'>
                     <h2 className='text-4xl font-bold mb-6 text-focinhando-dark'>Envie sua Mensagem</h2>

                     <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div>
                           <label htmlFor='fullName' className='block mb-2 font-semibold text-focinhando-dark'>
                              Nome Completo
                           </label>
                           <input
                              type='text'
                              id='fullName'
                              name='fullName'
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                           />
                        </div>

                        <div>
                           <label htmlFor='email' className='block mb-2 font-semibold text-focinhando-dark'>
                              Email
                           </label>
                           <input
                              type='email'
                              id='email'
                              name='email'
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                           />
                        </div>

                        <div>
                           <label htmlFor='phoneNumber' className='block mb-2 font-semibold text-focinhando-dark'>
                              Telefone
                           </label>
                           <input
                              type='tel'
                              id='phoneNumber'
                              name='phoneNumber'
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              placeholder='(00) 12345-6789'
                              className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition'
                           />
                        </div>

                        <div>
                           <label htmlFor='subject' className='block mb-2 font-semibold text-focinhando-dark'>
                              Assunto
                           </label>
                           <select
                              id='subject'
                              name='subject'
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition bg-white'
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
                           <label htmlFor='message' className='block mb-2 font-semibold text-focinhando-dark'>
                              Mensagem
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
                              className='w-full p-4 rounded-xl border-2 border-focinhando-border focus:border-focinhando-accent focus:outline-none transition resize-none'
                           />
                        </div>

                        <button
                           type='submit'
                           disabled={loading}
                           className={`w-full p-4 rounded-xl font-bold text-white text-lg transition ${loading
                              ? 'bg-gray-400 cursor-not-allowed'
                              : submitStatus === 'success'
                                 ? 'bg-green-500'
                                 : submitStatus === 'error'
                                    ? 'bg-red-500'
                                    : 'bg-focinhando-accent hover:bg-focinhando-accent-dark'
                              }`}
                        >
                           {loading
                              ? 'Enviando...'
                              : submitStatus === 'success'
                                 ? 'Mensagem Enviada! ✓'
                                 : submitStatus === 'error'
                                    ? 'Erro ao enviar. Tente novamente.'
                                    : 'Enviar Mensagem'}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </section>

         {/* Additional Info Section */}
         <section className='py-16 bg-focinhando-gray'>
            <div className='container mx-auto px-5 text-center'>
               <h2 className='text-3xl md:text-4xl font-bold mb-4 text-focinhando-dark'>
                  Tem alguma dúvida sobre o processo de adoção?
               </h2>
               <p className='text-lg text-focinhando-text mb-8 max-w-3xl mx-auto'>
                  Nossa equipe está pronta para te ajudar em todas as etapas. Entre em contato e vamos juntos
                  encontrar o pet perfeito para você!
               </p>
               <div className='flex flex-wrap justify-center gap-4'>
                  <a
                     href='https://wa.me/5594999990000'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='px-8 py-4 bg-focinhando-accent text-white rounded-xl font-bold hover:bg-focinhando-accent-dark transition'
                  >
                     Falar no WhatsApp
                  </a>
                  <a
                     href='mailto:contato@focinhando.com'
                     className='px-8 py-4 bg-white text-focinhando-accent border-2 border-focinhando-accent rounded-xl font-bold hover:bg-focinhando-accent hover:text-white transition'
                  >
                     Enviar Email
                  </a>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Contact
