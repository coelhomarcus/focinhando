import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useApi } from '@/hooks/useApi'
import HomeIcon from '@/assets/icons/home.svg'
import BlogIcon from '@/assets/icons/blog.svg'
import ContactIcon from '@/assets/icons/contact.svg'
import InfoIcon from '@/assets/icons/info.svg'

interface User {
   id: string
   email: string
   role: string
   createdAt: Date
}

interface UserComplement {
   id: string
   user: {
      name: string
   }
   img: string | null
   phoneNumber: string
   city: string
   state: string
   dateOfBirth: Date | null
   adoptedPet: number
   availablePet: number
   createdAt: Date
}

const Profile = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [user, setUser] = useState<User | null>(null)
   const [complement, setComplement] = useState<UserComplement | null>(null)
   const [loading, setLoading] = useState(true)
   const [editing, setEditing] = useState(false)
   const [editData, setEditData] = useState({
      phoneNumber: '',
      city: '',
      state: '',
      dateOfBirth: ''
   })
   const [saveSuccess, setSaveSuccess] = useState(false)
   const [error, setError] = useState('')

   const loadUserData = useCallback(async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
         navigate('/login')
         return
      }

      try {
         setLoading(true)

         // Load complement (which includes user data)
         const complementResponse = await fetch(`${apiBaseUrl}/user/complement`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const complementData = await complementResponse.json()

         if (!complementData.error && complementData.complement) {
            setComplement(complementData.complement)
            setEditData({
               phoneNumber: complementData.complement.phoneNumber || '',
               city: complementData.complement.city || '',
               state: complementData.complement.state || '',
               dateOfBirth: complementData.complement.dateOfBirth
                  ? new Date(complementData.complement.dateOfBirth).toISOString().split('T')[0]
                  : ''
            })

            // Set basic user info from complement's createdAt
            setUser({
               id: '',
               email: '',
               role: 'member',
               createdAt: complementData.complement.createdAt
            })
         } else {
            // If no complement, just set a default user
            setUser({
               id: '',
               email: '',
               role: 'member',
               createdAt: new Date()
            })
         }
      } catch (error) {
         console.error('Erro ao carregar dados:', error)
      } finally {
         setLoading(false)
      }
   }, [apiBaseUrl, navigate])

   useEffect(() => {
      loadUserData()
   }, [loadUserData])

   const handleSave = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) return

      setError('')
      setSaveSuccess(false)

      // Validate phone number format
      const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/
      if (editData.phoneNumber && !phoneRegex.test(editData.phoneNumber)) {
         setError('Formato de telefone inválido. Use: (00) 00000-0000')
         return
      }

      // Validate required fields
      if (!editData.city || !editData.state) {
         setError('Cidade e Estado são obrigatórios')
         return
      }

      try {
         const dataToSend = {
            img: 'https://ui-avatars.com/api/?name=User&background=ee6551&color=fff&size=128',
            phoneNumber: editData.phoneNumber,
            city: editData.city,
            state: editData.state.toUpperCase(),
            dateOfBirth: editData.dateOfBirth ? new Date(editData.dateOfBirth).toISOString() : new Date().toISOString()
         }

         const endpoint = complement ? `${apiBaseUrl}/user/complement` : `${apiBaseUrl}/user/complement`
         const method = complement ? 'PUT' : 'POST'

         const response = await fetch(endpoint, {
            method,
            headers: {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
         })

         const data = await response.json()

         if (data.error) {
            setError(data.error)
            return
         }

         setSaveSuccess(true)
         setEditing(false)
         loadUserData()

         setTimeout(() => setSaveSuccess(false), 3000)
      } catch (error) {
         console.error('Erro ao salvar:', error)
         setError('Erro ao salvar dados')
      }
   }

   const handleLogout = () => {
      localStorage.removeItem('authToken')
      navigate('/login')
   }

   const formatDate = (date: Date | null) => {
      if (!date) return 'Não informado'
      return new Date(date).toLocaleDateString('pt-BR')
   }

   const getMemberSince = (date: Date) => {
      const created = new Date(date)
      const now = new Date()
      const months = (now.getFullYear() - created.getFullYear()) * 12 + now.getMonth() - created.getMonth()

      if (months < 1) return 'Menos de 1 mês'
      if (months === 1) return '1 mês no site'
      return `${months} meses no site`
   }

   if (loading) {
      return (
         <div className='flex justify-center items-center min-h-screen'>
            <div className='text-2xl text-focinhando-accent'>Carregando...</div>
         </div>
      )
   }

   return (
      <div className='min-h-screen pb-20'>
         {/* Hero Section */}
         <section className='bg-linear-to-r from-focinhando-accent to-[#ff8a75] py-16 text-white'>
            <div className='container mx-auto px-5 text-center'>
               <h1 className='text-5xl md:text-6xl font-bold mb-4'>Meu Perfil</h1>
               <p className='text-xl'>Informações da sua conta</p>
            </div>
         </section>

         {/* Profile Section */}
         <section className='py-12'>
            <div className='container mx-auto px-5'>
               <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
                  {/* Profile Card */}
                  <div className='lg:col-span-2 bg-white rounded-3xl border-2 border-focinhando-border p-8 shadow-lg'>
                     <div className='flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b-2 border-focinhando-border'>
                        <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-focinhando-accent shrink-0'>
                           <img
                              src={complement?.img || `https://ui-avatars.com/api/?name=${complement?.user.name}&background=ee6551&color=fff&size=128`}
                              alt='Profile'
                              className='w-full h-full object-cover'
                           />
                        </div>
                        <div className='text-center md:text-left'>
                           <h2 className='text-3xl font-bold mb-2'>{complement?.user.name}</h2>
                           <p className='text-lg text-focinhando-accent mb-2'>
                              {complement ? `${complement.city} - ${complement.state}` : 'Localização não informada'}
                           </p>
                           <p className='text-focinhando-text'>
                              {user && `Membro desde ${formatDate(user.createdAt)}`}
                           </p>
                           <p className='text-sm text-focinhando-text mt-1'>
                              {user && getMemberSince(user.createdAt)}
                           </p>
                        </div>
                     </div>

                     {/* Profile Details */}
                     {editing ? (
                        <div className='space-y-4'>
                           <h3 className='text-2xl font-bold mb-6'>Editar Informações</h3>

                           <div>
                              <label className='block text-sm font-semibold mb-2'>Telefone</label>
                              <input
                                 type='tel'
                                 value={editData.phoneNumber}
                                 onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                                 className='w-full p-3 border-2 border-focinhando-border rounded-xl focus:border-focinhando-accent outline-none'
                                 placeholder='(00) 00000-0000'
                              />
                           </div>

                           <div className='grid grid-cols-2 gap-4'>
                              <div>
                                 <label className='block text-sm font-semibold mb-2'>Cidade</label>
                                 <input
                                    type='text'
                                    value={editData.city}
                                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                    className='w-full p-3 border-2 border-focinhando-border rounded-xl focus:border-focinhando-accent outline-none'
                                    placeholder='Sua cidade'
                                 />
                              </div>
                              <div>
                                 <label className='block text-sm font-semibold mb-2'>Estado</label>
                                 <input
                                    type='text'
                                    value={editData.state}
                                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                                    className='w-full p-3 border-2 border-focinhando-border rounded-xl focus:border-focinhando-accent outline-none'
                                    placeholder='UF'
                                    maxLength={2}
                                 />
                              </div>
                           </div>

                           <div>
                              <label className='block text-sm font-semibold mb-2'>Data de Nascimento</label>
                              <input
                                 type='date'
                                 value={editData.dateOfBirth}
                                 onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                                 className='w-full p-3 border-2 border-focinhando-border rounded-xl focus:border-focinhando-accent outline-none'
                              />
                           </div>

                           {error && (
                              <div className='bg-red-100 border-2 border-red-500 text-red-700 p-3 rounded-xl'>
                                 {error}
                              </div>
                           )}

                           {saveSuccess && (
                              <div className='bg-green-100 border-2 border-green-500 text-green-700 p-3 rounded-xl'>
                                 Dados salvos com sucesso!
                              </div>
                           )}

                           <div className='flex gap-4 pt-4'>
                              <button
                                 onClick={handleSave}
                                 className='flex-1 bg-focinhando-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition'
                              >
                                 Salvar
                              </button>
                              <button
                                 onClick={() => setEditing(false)}
                                 className='flex-1 bg-focinhando-gray border-2 border-focinhando-border px-6 py-3 rounded-xl font-semibold hover:bg-opacity-80 transition'
                              >
                                 Cancelar
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div>
                           <div className='flex justify-between items-center mb-6'>
                              <h3 className='text-2xl font-bold'>Informações</h3>
                              <button
                                 onClick={() => setEditing(true)}
                                 className='bg-focinhando-accent text-white px-6 py-2 rounded-xl font-semibold hover:bg-opacity-90 transition'
                              >
                                 Editar
                              </button>
                           </div>

                           <div className='space-y-4'>
                              <div className='flex justify-between py-3 border-b border-focinhando-border'>
                                 <strong>Telefone:</strong>
                                 <span>{complement?.phoneNumber || 'Não informado'}</span>
                              </div>
                              <div className='flex justify-between py-3 border-b border-focinhando-border'>
                                 <strong>Cidade:</strong>
                                 <span>{complement ? `${complement.city} - ${complement.state}` : 'Não informado'}</span>
                              </div>
                              <div className='flex justify-between py-3 border-b border-focinhando-border'>
                                 <strong>Data de nascimento:</strong>
                                 <span>{formatDate(complement?.dateOfBirth || null)}</span>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Stats Card */}
                  <div className='bg-white rounded-3xl border-2 border-focinhando-border p-8 shadow-lg h-fit'>
                     <h3 className='text-2xl font-bold mb-6'>Minhas Estatísticas</h3>
                     <div className='space-y-6'>
                        <div className='text-center p-6 bg-focinhando-gray rounded-2xl'>
                           <div className='text-4xl font-extrabold text-focinhando-accent mb-2'>
                              {complement?.adoptedPet || 0}
                           </div>
                           <div className='text-sm font-medium'>Pets adotados</div>
                        </div>
                        <div className='text-center p-6 bg-focinhando-gray rounded-2xl'>
                           <div className='text-4xl font-extrabold text-focinhando-accent mb-2'>
                              {complement?.availablePet || 0}
                           </div>
                           <div className='text-sm font-medium'>Pet disponibilizado</div>
                        </div>
                        <div className='text-center p-6 bg-focinhando-gray rounded-2xl'>
                           <div className='text-4xl font-extrabold text-focinhando-accent mb-2'>
                              {user && Math.max(1, Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)))}
                           </div>
                           <div className='text-sm font-medium'>Meses no site</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Profile Actions */}
               <div className='bg-white rounded-3xl border-2 border-focinhando-border p-8 shadow-lg'>
                  <h3 className='text-2xl font-bold mb-6'>Ações do Perfil</h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                     <button
                        onClick={() => navigate('/')}
                        className='flex items-center gap-3 p-4 bg-focinhando-gray border-2 border-focinhando-border rounded-xl hover:shadow-lg transition-all'
                     >
                        <img src={HomeIcon} alt='Home' className='w-6 h-6' />
                        <span className='font-semibold'>Ver Pets Disponíveis</span>
                     </button>
                     <button
                        onClick={() => navigate('/about')}
                        className='flex items-center gap-3 p-4 bg-focinhando-gray border-2 border-focinhando-border rounded-xl hover:shadow-lg transition-all'
                     >
                        <img src={InfoIcon} alt='About' className='w-6 h-6' />
                        <span className='font-semibold'>Sobre Nós</span>
                     </button>
                     <button
                        onClick={() => navigate('/blog')}
                        className='flex items-center gap-3 p-4 bg-focinhando-gray border-2 border-focinhando-border rounded-xl hover:shadow-lg transition-all'
                     >
                        <img src={BlogIcon} alt='Blog' className='w-6 h-6' />
                        <span className='font-semibold'>Ler Blog</span>
                     </button>
                     <button
                        onClick={() => navigate('/contact')}
                        className='flex items-center gap-3 p-4 bg-focinhando-gray border-2 border-focinhando-border rounded-xl hover:shadow-lg transition-all'
                     >
                        <img src={ContactIcon} alt='Contact' className='w-6 h-6' />
                        <span className='font-semibold'>Entrar em Contato</span>
                     </button>
                  </div>

                  <button
                     onClick={handleLogout}
                     className='w-full mt-6 bg-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-red-600 transition'
                  >
                     Sair da Conta
                  </button>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Profile
