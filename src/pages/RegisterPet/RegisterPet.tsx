import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useApi } from '@/hooks/useApi'
import { FaDog, FaSpinner } from 'react-icons/fa'
import type { PetForm, SubmitStatus } from './types'

import LoadingState from '../../components/LoadingState'
import HeroSection from './components/HeroSection'
import IncompleteProfileWarning from './components/IncompleteProfileWarning'
import PetFormFields from './components/PetFormFields'
import StatusMessages from './components/StatusMessages'
import InfoCard from './components/InfoCard'

const RegisterPet = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [checkingProfile, setCheckingProfile] = useState(true)
   const [hasComplement, setHasComplement] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
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
   const [selectedFile, setSelectedFile] = useState<File | null>(null)
   const [uploading, setUploading] = useState(false)
   // Cloudinary config (use env vars se possível)
   const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
   const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

   const uploadToCloudinary = async (file: File): Promise<string | null> => {
      setUploading(true)
      setErrorMessage('')
      try {
         const formData = new FormData()
         formData.append('file', file)
         formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
         const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
               method: 'POST',
               body: formData
            }
         )
         const data = await response.json()
         if (data.secure_url) {
            setPetForm(prev => ({ ...prev, img: data.secure_url }))
            return data.secure_url
         } else {
            setErrorMessage('Erro ao fazer upload da imagem')
            return null
         }
      } catch (error) {
         setErrorMessage('Erro ao fazer upload da imagem ' + error)
         return null
      } finally {
         setUploading(false)
      }
   }

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

      let imageUrl = petForm.img
      if (selectedFile) {
         imageUrl = await uploadToCloudinary(selectedFile) || ''
         if (!imageUrl) {
            setLoading(false)
            return
         }
      }

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
               img: imageUrl,
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

   if (checkingProfile) {
      return <LoadingState text="Verificando seu perfil" />
   }

   if (!hasComplement) {
      return (
         <IncompleteProfileWarning
            onNavigateHome={() => navigate('/')}
            onNavigateProfile={() => navigate('/profile')}
         />
      )
   }

   return (
      <div className='min-h-screen bg-gray-50'>
         <HeroSection
            icon={<FaDog className='text-4xl text-white' />}
            title='Cadastrar Pet para Adoção'
            description='Preencha as informações do seu pet para disponibilizá-lo para adoção'
         />

         <section className='py-8 sm:py-12'>
            <div className='container mx-auto px-4 sm:px-6 max-w-4xl'>
               <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>

                  <div className='p-6 sm:p-8 border-b border-gray-200'>
                     <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                        Informações do Pet
                     </h2>
                     <p className='text-gray-600 text-sm'>
                        Todos os campos marcados com <span className='text-red-500 font-semibold'>*</span> são obrigatórios
                     </p>
                  </div>

                  <form onSubmit={handleSubmit} className='p-6 sm:p-8'>
                     <PetFormFields
                        petForm={petForm}
                        setPetForm={setPetForm}
                        onFileSelect={setSelectedFile}
                        uploading={uploading}
                        selectedFileObj={selectedFile}
                     />

                     {/* Sobre o Pet */}
                     <div className='mt-4 sm:mt-6'>
                        <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>
                           Sobre o pet <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                           value={petForm.about}
                           onChange={(e) => setPetForm({ ...petForm, about: e.target.value })}
                           required
                           rows={5}
                           placeholder='Descreva a personalidade, características, comportamento e qualquer informação importante sobre o pet...'
                           className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:border-focinhando-accent focus:ring-2 focus:ring-focinhando-accent/50 outline-none transition resize-none'
                        />
                     </div>

                     <StatusMessages submitStatus={submitStatus} errorMessage={errorMessage} />

                     {/* Submit Button */}
                     <div className='mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3'>
                        <button
                           type='button'
                           onClick={() => navigate('/')}
                           className='px-6 py-3 rounded-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all text-sm sm:text-base'
                        >
                           Cancelar
                        </button>
                        <button
                           type='submit'
                           disabled={loading}
                           className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${loading
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-focinhando-accent text-white hover:bg-focinhando-accent/90 shadow-sm hover:shadow-md'
                              }`}
                        >
                           {loading ? (
                              <span className='flex items-center justify-center gap-3'>
                                 <FaSpinner className='animate-spin h-5 w-5' />
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

               <InfoCard />
            </div>
         </section>
      </div>
   )
}

export default RegisterPet
