import { useState } from 'react'
import type { PetForm as PetFormType } from '../types'
import { StatusMessage } from './SharedComponents'
import { FaSyringe } from 'react-icons/fa'

interface PetFormProps {
   apiBaseUrl: string
}

const PetForm = ({ apiBaseUrl }: PetFormProps) => {
   const [loading, setLoading] = useState(false)
   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
   const [petForm, setPetForm] = useState<PetFormType>({
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
      weight: 0,
      userComplementId: ''
   })
   const [selectedFile, setSelectedFile] = useState<File | null>(null)
   const [uploading, setUploading] = useState(false)
   // Cloudinary config (use env vars se possível)
   const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
   const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

   const uploadToCloudinary = async (file: File): Promise<string | null> => {
      setUploading(true)
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
            setSubmitStatus('error')
            return null
         }
      } catch (error) {
         console.error('Erro no upload:', error)
         setSubmitStatus('error')
         return null
      } finally {
         setUploading(false)
      }
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSubmitStatus('idle')

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
         const response = await fetch(`${apiBaseUrl}/pets/register`, {
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
            console.error('Erro ao cadastrar pet:', data.error)
         } else {
            setSubmitStatus('success')
            setPetForm({
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
               weight: 0,
               userComplementId: ''
            })
            setSelectedFile(null)
         }
      } catch (error) {
         console.error('Erro ao conectar com o servidor:', error)
         setSubmitStatus('error')
      } finally {
         setLoading(false)
         setTimeout(() => setSubmitStatus('idle'), 3000)
      }
   }

   return (
      <div className='bg-white rounded-xl border border-gray-200'>
         <div className='px-6 py-5 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>Cadastrar Novo Pet</h2>
            <p className='text-sm text-gray-600 mt-1'>Adicione um novo pet para adoção</p>
         </div>

         <form onSubmit={handleSubmit} className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
               {/* Nome */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Nome do pet <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='text'
                     value={petForm.name}
                     onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                     required
                     placeholder='Ex: Max'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm'
                  />
               </div>

               {/* Imagem Upload */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Imagem <span className='text-red-500'>*</span>
                  </label>
                  <label className='w-full cursor-pointer'>
                     <div className={`w-full px-4 py-2.5 rounded-lg border-2 transition flex items-center justify-center gap-2 ${uploading
                        ? 'border-focinhando-accent bg-focinhando-accent/5 cursor-wait'
                        : 'border-gray-300 bg-gray-50 hover:border-focinhando-accent hover:bg-gray-100'
                        }`}>
                        {uploading ? (
                           <span className='text-focinhando-accent font-semibold'>Enviando imagem...</span>
                        ) : (
                           <span className='text-gray-700'>
                              {selectedFile ? selectedFile.name : 'Escolher arquivo'}
                           </span>
                        )}
                     </div>
                     <input
                        type='file'
                        accept='image/*'
                        onChange={e => {
                           const file = e.target.files?.[0]
                           if (file) setSelectedFile(file)
                        }}
                        disabled={uploading}
                        className='hidden'
                     />
                  </label>
                  {/* Preview da imagem */}
                  {(selectedFile || petForm.img) && (
                     <div className='mt-3 flex items-center gap-3'>
                        <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20'>
                           <img
                              src={selectedFile ? URL.createObjectURL(selectedFile) : petForm.img}
                              alt='Preview'
                              className='w-full h-full object-cover'
                           />
                        </div>
                        <span className='text-xs text-gray-600'>Preview da imagem</span>
                     </div>
                  )}
               </div>

               {/* Data de Nascimento */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Data de nascimento <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='date'
                     value={petForm.age}
                     onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                     required
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm'
                  />
               </div>

               {/* Espécie */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Espécie <span className='text-red-500'>*</span>
                  </label>
                  <select
                     value={petForm.specie}
                     onChange={(e) => setPetForm({ ...petForm, specie: e.target.value })}
                     required
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm bg-white'
                  >
                     <option value='cão'>Cão</option>
                     <option value='gato'>Gato</option>
                  </select>
               </div>

               {/* Raça */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Raça <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='text'
                     value={petForm.race}
                     onChange={(e) => setPetForm({ ...petForm, race: e.target.value })}
                     required
                     placeholder='Ex: Labrador'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm'
                  />
               </div>

               {/* Sexo */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Sexo <span className='text-red-500'>*</span>
                  </label>
                  <select
                     value={petForm.sex}
                     onChange={(e) => setPetForm({ ...petForm, sex: e.target.value })}
                     required
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm bg-white'
                  >
                     <option value='macho'>♂️ Macho</option>
                     <option value='fêmea'>♀️ Fêmea</option>
                  </select>
               </div>

               {/* Peso */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Peso (kg) <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='number'
                     value={petForm.weight}
                     onChange={(e) => setPetForm({ ...petForm, weight: Number(e.target.value) })}
                     required
                     min='0'
                     step='0.1'
                     placeholder='0.0'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm'
                  />
               </div>

               {/* Cidade */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Cidade <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='text'
                     value={petForm.city}
                     onChange={(e) => setPetForm({ ...petForm, city: e.target.value })}
                     required
                     placeholder='Ex: Belém'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm'
                  />
               </div>

               {/* Estado */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     Estado <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='text'
                     value={petForm.state}
                     onChange={(e) => setPetForm({ ...petForm, state: e.target.value })}
                     required
                     maxLength={2}
                     placeholder='PA'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm uppercase'
                  />
               </div>

               {/* User Complement ID */}
               <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                     ID do usuário <span className='text-red-500'>*</span>
                  </label>
                  <input
                     type='text'
                     value={petForm.userComplementId}
                     onChange={(e) => setPetForm({ ...petForm, userComplementId: e.target.value })}
                     required
                     placeholder='UUID do complemento'
                     className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition text-sm font-mono'
                  />
               </div>

               {/* Vacinado */}
               <div className='flex items-center h-full pt-8'>
                  <label className='flex items-center gap-3 cursor-pointer group'>
                     <input
                        type='checkbox'
                        id='vaccinated'
                        checked={petForm.vaccinated}
                        onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.checked })}
                        className='w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900/10'
                     />
                     <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2'>
                        <FaSyringe /> Pet vacinado
                     </span>
                  </label>
               </div>
            </div>

            {/* Sobre o Pet */}
            <div className='mt-5'>
               <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Sobre o pet <span className='text-red-500'>*</span>
               </label>
               <textarea
                  value={petForm.about}
                  onChange={(e) => setPetForm({ ...petForm, about: e.target.value })}
                  required
                  rows={4}
                  placeholder='Descreva a personalidade e características do pet...'
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none transition resize-none text-sm'
               />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
               <div className='mt-5'>
                  <StatusMessage type='success' message='Pet cadastrado com sucesso!' />
               </div>
            )}
            {submitStatus === 'error' && (
               <div className='mt-5'>
                  <StatusMessage type='error' message='Erro ao cadastrar pet. Tente novamente.' />
               </div>
            )}

            {/* Submit Button */}
            <div className='mt-6 flex gap-3'>
               <button
                  type='submit'
                  disabled={loading}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all ${loading
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     : 'bg-focinhando-accent text-white hover:bg-gray-800 active:scale-[0.98]'
                     }`}
               >
                  {loading ? (
                     <span className='flex items-center justify-center gap-2'>
                        <span className='inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></span>
                        Cadastrando...
                     </span>
                  ) : (
                     'Cadastrar Pet'
                  )}
               </button>
            </div>
         </form>
      </div>
   )
}

export default PetForm
