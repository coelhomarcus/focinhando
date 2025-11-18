import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useApi } from '@/hooks/useApi'
import { FaSyringe, FaDog, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'

interface PetForm {
   name: string
   img: string
   age: string
   city: string
   state: string
   sex: string
   vaccinated: boolean
   about: string
   specie: string
   race: string
   weight: number
}

const RegisterPet = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [checkingProfile, setCheckingProfile] = useState(true)
   const [hasComplement, setHasComplement] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
   const [errorMessage, setErrorMessage] = useState('')
   const [petForm, setPetForm] = useState<PetForm>({
      name: '',
      img: '',
      age: '',
      city: '',
      state: '',
      sex: 'macho',
      vaccinated: false,
      about: '',
      specie: 'cão',
      race: '',
      weight: 0
   })

   useEffect(() => {
      const checkUserComplement = async () => {
         const token = localStorage.getItem('authToken')
         if (!token) {
            navigate('/login')
            return
         }

         try {
            const response = await fetch(`${apiBaseUrl}/user/complement`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            const data = await response.json()

            if (!data.error && data.complement) {
               setHasComplement(true)
            } else {
               setHasComplement(false)
            }
         } catch (error) {
            console.error('Erro ao verificar perfil:', error)
            setHasComplement(false)
         } finally {
            setCheckingProfile(false)
         }
      }

      checkUserComplement()
   }, [apiBaseUrl, navigate])

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSubmitStatus('idle')
      setErrorMessage('')

      try {
         const token = localStorage.getItem('authToken')
         const response = await fetch(`${apiBaseUrl}/pets/user`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
               ...petForm,
               weight: Number(petForm.weight)
            })
         })

         const data = await response.json()

         if (data.error) {
            setSubmitStatus('error')
            setErrorMessage(data.error)
            console.error('Erro ao cadastrar pet:', data.error)
         } else {
            setSubmitStatus('success')
            setTimeout(() => {
               navigate('/')
            }, 2000)
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
         setSubmitStatus('error')
         setErrorMessage('Erro ao conectar com o servidor. Tente novamente.')
      } finally {
         setLoading(false)
      }
   }

   // Loading state while checking profile
   if (checkingProfile) {
      return (
         <div className='min-h-screen bg-linear-to-br from-focinhando-accent/5 via-white to-focinhando-accent/5 flex items-center justify-center'>
            <div className='text-center'>
               <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-focinhando-accent mx-auto mb-4'></div>
               <p className='text-gray-600 font-medium'>Verificando seu perfil...</p>
            </div>
         </div>
      )
   }

   // Warning if user doesn't have complement
   if (!hasComplement) {
      return (
         <div className='min-h-screen bg-linear-to-br from-focinhando-accent/5 via-white to-focinhando-accent/5 py-12'>
            <div className='container mx-auto px-4 max-w-2xl'>
               <button
                  onClick={() => navigate('/')}
                  className='flex items-center gap-2 text-focinhando-accent hover:text-focinhando-accent/80 transition-colors mb-8'
               >
                  <FaArrowLeft />
                  <span className='text-sm font-medium'>Voltar</span>
               </button>

               <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
                  {/* Alert Banner */}
                  <div className='bg-amber-50 border-b border-amber-200 px-8 py-6'>
                     <div className='flex items-start gap-4'>
                        <div className='shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center'>
                           <FaExclamationTriangle className='text-2xl text-amber-600' />
                        </div>
                        <div className='flex-1'>
                           <h2 className='text-xl font-bold text-gray-900 mb-1'>Perfil Incompleto</h2>
                           <p className='text-gray-600 text-sm'>
                              Complete seu cadastro para continuar com o registro do pet
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className='p-8'>
                     {/* Main Message */}
                     <div className='mb-6'>
                        <p className='text-gray-700 mb-3'>
                           Para cadastrar um pet para adoção, você precisa completar seu perfil com informações adicionais.
                        </p>
                        <p className='text-gray-600 text-sm'>
                           Isso é necessário para que possamos identificar e validar seus pets cadastrados, garantindo a segurança e confiabilidade da plataforma.
                        </p>
                     </div>

                     {/* Steps Card */}
                     <div className='bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200'>
                        <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                           <span className='w-6 h-6 rounded-full bg-focinhando-accent text-white flex items-center justify-center text-xs font-bold'>
                              ✓
                           </span>
                           Próximos passos
                        </h3>
                        <div className='space-y-2 ml-8'>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5'>1.</span>
                              <p className='text-gray-700 text-sm'>Acesse sua página de perfil</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5'>2.</span>
                              <p className='text-gray-700 text-sm'>Preencha as informações adicionais (telefone, cidade, estado, data de nascimento)</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5'>3.</span>
                              <p className='text-gray-700 text-sm'>Clique em "Salvar Alterações"</p>
                           </div>
                           <div className='flex items-start gap-3'>
                              <span className='text-focinhando-accent font-bold text-sm mt-0.5'>4.</span>
                              <p className='text-gray-700 text-sm'>Retorne aqui para cadastrar seu pet</p>
                           </div>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className='flex flex-col sm:flex-row gap-3'>
                        <button
                           onClick={() => navigate('/')}
                           className='px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all'
                        >
                           Voltar para Home
                        </button>
                        <button
                           onClick={() => navigate('/profile')}
                           className='flex-1 px-6 py-3 rounded-lg font-semibold bg-focinhando-accent text-white hover:bg-focinhando-accent/90 transition-all shadow-sm hover:shadow-md'
                        >
                           Completar Perfil Agora
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className='min-h-screen bg-linear-to-br from-focinhando-accent/5 via-white to-focinhando-accent/5 py-12'>
         <div className='container mx-auto px-4 max-w-4xl'>
            {/* Header */}
            <div className='mb-8'>
               <button
                  onClick={() => navigate('/')}
                  className='flex items-center gap-2 text-focinhando-accent hover:text-focinhando-accent/80 transition-colors mb-4'
               >
                  <FaArrowLeft />
                  <span className='text-sm font-medium'>Voltar</span>
               </button>
               <div className='text-center'>
                  <h1 className='text-4xl font-bold text-gray-900 mb-3'>
                     Cadastrar Pet para Adoção
                  </h1>
                  <p className='text-gray-600'>
                     Preencha as informações do seu pet para disponibilizá-lo para adoção
                  </p>
               </div>
            </div>

            {/* Form Card */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
               <div className='bg-linear-to-r from-focinhando-accent to-focinhando-accent/80 px-8 py-6'>
                  <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                     <FaDog className='text-3xl' />
                     Informações do Pet
                  </h2>
                  <p className='text-white/90 mt-2 text-sm'>
                     Todos os campos marcados com * são obrigatórios
                  </p>
               </div>

               <form onSubmit={handleSubmit} className='p-8'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                     {/* Nome */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Nome do pet <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='text'
                           value={petForm.name}
                           onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                           required
                           placeholder='Ex: Max, Luna, Bob...'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Imagem URL */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           URL da Imagem <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='url'
                           value={petForm.img}
                           onChange={(e) => setPetForm({ ...petForm, img: e.target.value })}
                           required
                           placeholder='https://exemplo.com/foto.jpg'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Data de Nascimento */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Data de nascimento <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='date'
                           value={petForm.age}
                           onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                           required
                           max={new Date().toISOString().split('T')[0]}
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Espécie */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Espécie <span className='text-red-500'>*</span>
                        </label>
                        <select
                           value={petForm.specie}
                           onChange={(e) => setPetForm({ ...petForm, specie: e.target.value })}
                           required
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition bg-white'
                        >
                           <option value='cão'>🐕 Cão</option>
                           <option value='gato'>🐈 Gato</option>
                        </select>
                     </div>

                     {/* Raça */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Raça <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='text'
                           value={petForm.race}
                           onChange={(e) => setPetForm({ ...petForm, race: e.target.value })}
                           required
                           placeholder='Ex: Labrador, SRD, Siamês...'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Sexo */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Sexo <span className='text-red-500'>*</span>
                        </label>
                        <select
                           value={petForm.sex}
                           onChange={(e) => setPetForm({ ...petForm, sex: e.target.value })}
                           required
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition bg-white'
                        >
                           <option value='macho'>♂️ Macho</option>
                           <option value='fêmea'>♀️ Fêmea</option>
                        </select>
                     </div>

                     {/* Peso */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Peso (kg) <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='number'
                           value={petForm.weight || ''}
                           onChange={(e) => setPetForm({ ...petForm, weight: Number(e.target.value) })}
                           required
                           min='0.1'
                           step='0.1'
                           placeholder='Ex: 15.5'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Cidade */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Cidade <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='text'
                           value={petForm.city}
                           onChange={(e) => setPetForm({ ...petForm, city: e.target.value })}
                           required
                           placeholder='Ex: Belém'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition'
                        />
                     </div>

                     {/* Estado */}
                     <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                           Estado <span className='text-red-500'>*</span>
                        </label>
                        <input
                           type='text'
                           value={petForm.state}
                           onChange={(e) => setPetForm({ ...petForm, state: e.target.value.toUpperCase() })}
                           required
                           maxLength={2}
                           placeholder='PA'
                           className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition uppercase'
                        />
                     </div>

                     {/* Vacinado */}
                     <div className='flex items-center h-full pt-8'>
                        <label className='flex items-center gap-3 cursor-pointer group'>
                           <div className='relative'>
                              <input
                                 type='checkbox'
                                 checked={petForm.vaccinated}
                                 onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.checked })}
                                 className='w-6 h-6 rounded border-2 border-gray-300 text-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 cursor-pointer'
                              />
                           </div>
                           <span className='text-sm font-semibold text-gray-700 group-hover:text-focinhando-accent transition-colors flex items-center gap-2'>
                              <FaSyringe className='text-focinhando-accent' />
                              Pet vacinado
                           </span>
                        </label>
                     </div>
                  </div>

                  {/* Sobre o Pet */}
                  <div className='mt-6'>
                     <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Sobre o pet <span className='text-red-500'>*</span>
                     </label>
                     <textarea
                        value={petForm.about}
                        onChange={(e) => setPetForm({ ...petForm, about: e.target.value })}
                        required
                        rows={5}
                        placeholder='Descreva a personalidade, características, comportamento e qualquer informação importante sobre o pet...'
                        className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/20 focus:outline-none transition resize-none'
                     />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                     <div className='mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg'>
                        <div className='flex items-center gap-3'>
                           <div className='shrink-0'>
                              <svg className='h-5 w-5 text-green-500' viewBox='0 0 20 20' fill='currentColor'>
                                 <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                              </svg>
                           </div>
                           <p className='text-sm font-medium text-green-800'>
                              Pet cadastrado com sucesso! Redirecionando...
                           </p>
                        </div>
                     </div>
                  )}

                  {submitStatus === 'error' && (
                     <div className='mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg'>
                        <div className='flex items-center gap-3'>
                           <div className='shrink-0'>
                              <svg className='h-5 w-5 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                                 <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                              </svg>
                           </div>
                           <p className='text-sm font-medium text-red-800'>
                              {errorMessage || 'Erro ao cadastrar pet. Tente novamente.'}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Submit Button */}
                  <div className='mt-8 flex gap-4'>
                     <button
                        type='button'
                        onClick={() => navigate('/')}
                        className='px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors'
                     >
                        Cancelar
                     </button>
                     <button
                        type='submit'
                        disabled={loading}
                        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all transform ${loading
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                           : 'bg-linear-to-r from-focinhando-accent to-focinhando-accent/80 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                           }`}
                     >
                        {loading ? (
                           <span className='flex items-center justify-center gap-3'>
                              <span className='inline-block animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent'></span>
                              Cadastrando pet...
                           </span>
                        ) : (
                           <span className='flex items-center justify-center gap-2'>
                              <FaDog />
                              Cadastrar Pet
                           </span>
                        )}
                     </button>
                  </div>
               </form>
            </div>

            {/* Info Card */}
            <div className='mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6'>
               <h3 className='font-semibold text-blue-900 mb-2 flex items-center gap-2'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                  </svg>
                  Informações Importantes
               </h3>
               <ul className='text-sm text-blue-800 space-y-1 ml-7'>
                  <li>• Certifique-se de que todas as informações estão corretas</li>
                  <li>• Use uma foto clara e de boa qualidade do pet</li>
                  <li>• Seja honesto sobre o temperamento e necessidades do pet</li>
                  <li>• Após o cadastro, o pet ficará disponível para adoção</li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default RegisterPet
