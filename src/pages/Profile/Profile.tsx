import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useApi } from '@/hooks/useApi'
import { FaHome, FaInfoCircle, FaEdit, FaEnvelope, FaUser, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaSignOutAlt, FaPaw, FaHeart, FaClock, FaCheck, FaTimes, FaSave } from 'react-icons/fa'


interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: Date
   updatedAt: Date
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
      img: '',
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

         // Load user data from GET /user
         const userResponse = await fetch(`${apiBaseUrl}/user`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const userData = await userResponse.json()

         if (!userData.error && userData.user) {
            setUser({
               id: userData.user.id,
               name: userData.user.name,
               email: userData.user.email,
               role: userData.user.role,
               createdAt: new Date(userData.user.createdAt),
               updatedAt: new Date(userData.user.updatedAt)
            })
         }

         // Load complement (which includes additional user data)
         const complementResponse = await fetch(`${apiBaseUrl}/user/complement`, {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const complementData = await complementResponse.json()

         if (!complementData.error && complementData.complement) {
            setComplement(complementData.complement)
            setEditData({
               img: complementData.complement.img || '',
               phoneNumber: complementData.complement.phoneNumber || '',
               city: complementData.complement.city || '',
               state: complementData.complement.state || '',
               dateOfBirth: complementData.complement.dateOfBirth
                  ? new Date(complementData.complement.dateOfBirth).toISOString().split('T')[0]
                  : ''
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
            img: editData.img || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ee6551&color=fff&size=128`,
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
         <div className='flex justify-center items-center min-h-screen bg-gray-50'>
            <div className='flex flex-col items-center gap-4'>
               <div className='animate-spin rounded-full h-16 w-16 border-4 border-focinhando-accent border-t-transparent'></div>
               <p className='text-lg text-gray-600 font-medium'>Carregando perfil...</p>
            </div>
         </div>
      )
   }

   return (
      <div className='min-h-screen bg-gray-50'>
         {/* Hero Section - Modern Gradient */}
         <section className='relative bg-linear-to-br from-focinhando-accent via-[#ff7961] to-[#ff8a75] py-20 overflow-hidden'>
            {/* Decorative elements */}
            <div className='absolute inset-0 opacity-10'>
               <div className='absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl'></div>
               <div className='absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl'></div>
            </div>

            <div className='container mx-auto px-6 relative z-10'>
               <div className='flex items-center justify-between max-w-6xl mx-auto'>
                  <div>
                     <h1 className='text-4xl md:text-5xl font-bold text-white mb-3'>
                        Olá, {user?.name?.split(' ')[0] || 'Usuário'}!
                     </h1>
                     <p className='text-white/90 text-lg'>
                        Gerencie suas informações e acompanhe sua jornada
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Profile Section */}
         <section className='py-12'>
            <div className='container mx-auto px-6 max-w-7xl'>
               <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                  {/* Main Profile Card */}
                  <div className='lg:col-span-2 space-y-6'>
                     {/* Profile Header Card */}
                     <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                        <div className='flex flex-col md:flex-row gap-6'>
                           {/* Avatar */}
                           <div className='relative'>
                              <div className='w-32 h-32 rounded-2xl overflow-hidden border-4 border-focinhando-accent/20 shadow-lg'>
                                 <img
                                    src={complement?.img || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ee6551&color=fff&size=128`}
                                    alt='Profile'
                                    className='w-full h-full object-cover'
                                 />
                              </div>
                              <div className='absolute -bottom-2 -right-2 bg-focinhando-accent text-white p-2 rounded-full shadow-lg'>
                                 <FaUser className='text-lg' />
                              </div>
                           </div>

                           {/* User Info */}
                           <div className='flex-1'>
                              <div className='flex items-start justify-between mb-4'>
                                 <div>
                                    <h2 className='text-3xl font-bold text-gray-900 mb-2'>{user?.name || 'Usuário'}</h2>
                                    <p className='text-lg text-focinhando-accent font-semibold mb-3'>
                                       {user?.role === 'admin' ? 'Administrador' : 'Membro'}
                                    </p>
                                 </div>
                              </div>

                              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                 <div className='flex items-center gap-2 text-gray-600'>
                                    <FaMapMarkerAlt className='text-focinhando-accent' />
                                    <span className='text-sm'>
                                       {complement ? `${complement.city}, ${complement.state}` : 'Localização não informada'}
                                    </span>
                                 </div>
                                 <div className='flex items-center gap-2 text-gray-600'>
                                    <FaClock className='text-focinhando-accent' />
                                    <span className='text-sm'>
                                       {user && getMemberSince(user.createdAt)}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Personal Information Card */}
                     <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                        <div className='flex justify-between items-center mb-6'>
                           <h3 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
                              <FaUser className='text-focinhando-accent' />
                              Informações Pessoais
                           </h3>
                           <button
                              onClick={() => setEditing(!editing)}
                              className='flex items-center gap-2 px-4 py-2 bg-focinhando-accent/10 text-focinhando-accent rounded-lg font-medium hover:bg-focinhando-accent hover:text-white transition-all'
                           >
                              {editing ? <><FaTimes /> Cancelar</> : <><FaEdit /> Editar</>}
                           </button>
                        </div>

                        {editing ? (
                           <div className='space-y-5'>
                              {/* Image URL Input */}
                              <div>
                                 <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                                    <FaUser className='text-focinhando-accent' />
                                    URL da Imagem de Perfil
                                 </label>
                                 <input
                                    type='url'
                                    value={editData.img}
                                    onChange={(e) => setEditData({ ...editData, img: e.target.value })}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition'
                                    placeholder='https://exemplo.com/sua-foto.jpg'
                                 />
                                 <p className='text-xs text-gray-500 mt-1.5'>
                                    Cole a URL de uma imagem pública. Deixe em branco para usar o avatar padrão.
                                 </p>
                                 {/* Preview da imagem */}
                                 {editData.img && (
                                    <div className='mt-3 flex items-center gap-3'>
                                       <div className='w-16 h-16 rounded-lg overflow-hidden border-2 border-focinhando-accent/20'>
                                          <img
                                             src={editData.img}
                                             alt='Preview'
                                             className='w-full h-full object-cover'
                                             onError={(e) => {
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=ee6551&color=fff&size=128`
                                             }}
                                          />
                                       </div>
                                       <span className='text-xs text-gray-600'>Preview da imagem</span>
                                    </div>
                                 )}
                              </div>

                              {/* Phone Input */}
                              <div>
                                 <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                                    <FaPhone className='text-focinhando-accent' />
                                    Telefone
                                 </label>
                                 <input
                                    type='tel'
                                    value={editData.phoneNumber}
                                    onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition'
                                    placeholder='(00) 00000-0000'
                                 />
                              </div>

                              {/* City and State */}
                              <div className='grid grid-cols-2 gap-4'>
                                 <div>
                                    <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                                       <FaMapMarkerAlt className='text-focinhando-accent' />
                                       Cidade
                                    </label>
                                    <input
                                       type='text'
                                       value={editData.city}
                                       onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                       className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition'
                                       placeholder='Sua cidade'
                                    />
                                 </div>
                                 <div>
                                    <label className='text-sm font-semibold text-gray-700 mb-2 block'>Estado (UF)</label>
                                    <input
                                       type='text'
                                       value={editData.state}
                                       onChange={(e) => setEditData({ ...editData, state: e.target.value.toUpperCase() })}
                                       className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition uppercase'
                                       placeholder='PA'
                                       maxLength={2}
                                    />
                                 </div>
                              </div>

                              {/* Birth Date */}
                              <div>
                                 <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2'>
                                    <FaBirthdayCake className='text-focinhando-accent' />
                                    Data de Nascimento
                                 </label>
                                 <input
                                    type='date'
                                    value={editData.dateOfBirth}
                                    onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent/50 focus:border-focinhando-accent outline-none transition'
                                 />
                              </div>

                              {/* Messages */}
                              {error && (
                                 <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2'>
                                    <FaTimes className='shrink-0' />
                                    <span className='text-sm'>{error}</span>
                                 </div>
                              )}

                              {saveSuccess && (
                                 <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2'>
                                    <FaCheck className='shrink-0' />
                                    <span className='text-sm'>Dados salvos com sucesso!</span>
                                 </div>
                              )}

                              {/* Save Button */}
                              <button
                                 onClick={handleSave}
                                 className='w-full bg-focinhando-accent text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-focinhando-accent/90 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2'
                              >
                                 <FaSave />
                                 Salvar Alterações
                              </button>
                           </div>
                        ) : (
                           <div className='space-y-4'>
                              <div className='flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg'>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FaEnvelope className='text-focinhando-accent' />
                                    <span className='font-medium text-sm'>E-mail</span>
                                 </div>
                                 <span className='text-gray-900 font-semibold'>{user?.email || 'Não informado'}</span>
                              </div>
                              <div className='flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg'>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FaPhone className='text-focinhando-accent' />
                                    <span className='font-medium text-sm'>Telefone</span>
                                 </div>
                                 <span className='text-gray-900 font-semibold'>{complement?.phoneNumber || 'Não informado'}</span>
                              </div>
                              <div className='flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg'>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FaMapMarkerAlt className='text-focinhando-accent' />
                                    <span className='font-medium text-sm'>Localização</span>
                                 </div>
                                 <span className='text-gray-900 font-semibold'>
                                    {complement ? `${complement.city}, ${complement.state}` : 'Não informado'}
                                 </span>
                              </div>
                              <div className='flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg'>
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FaBirthdayCake className='text-focinhando-accent' />
                                    <span className='font-medium text-sm'>Data de Nascimento</span>
                                 </div>
                                 <span className='text-gray-900 font-semibold'>{formatDate(complement?.dateOfBirth || null)}</span>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Stats Sidebar */}
                  <div className='space-y-6'>
                     {/* Stats Card */}
                     <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                           <FaHeart className='text-focinhando-accent' />
                           Minhas Estatísticas
                        </h3>
                        <div className='space-y-4'>
                           {/* Adopted Pets */}
                           <div className='bg-linear-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200'>
                              <div className='flex items-center justify-between mb-2'>
                                 <FaPaw className='text-green-600 text-2xl' />
                                 <span className='text-3xl font-bold text-green-700'>
                                    {complement?.adoptedPet || 0}
                                 </span>
                              </div>
                              <p className='text-sm font-semibold text-green-800'>Pets Adotados</p>
                              <p className='text-xs text-green-600 mt-1'>Você fez a diferença! 🎉</p>
                           </div>

                           {/* Available Pets */}
                           <div className='bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200'>
                              <div className='flex items-center justify-between mb-2'>
                                 <FaHeart className='text-blue-600 text-2xl' />
                                 <span className='text-3xl font-bold text-blue-700'>
                                    {complement?.availablePet || 0}
                                 </span>
                              </div>
                              <p className='text-sm font-semibold text-blue-800'>Pets Disponibilizados</p>
                              <p className='text-xs text-blue-600 mt-1'>Ajudando pets a encontrar lares</p>
                           </div>

                           {/* Time on Site */}
                           <div className='bg-linear-to-br from-focinhando-accent/10 to-focinhando-accent/20 rounded-xl p-5 border border-focinhando-accent/30'>
                              <div className='flex items-center justify-between mb-2'>
                                 <FaClock className='text-focinhando-accent text-2xl' />
                                 <span className='text-3xl font-bold text-focinhando-accent'>
                                    {user && Math.max(1, Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)))}
                                 </span>
                              </div>
                              <p className='text-sm font-semibold text-focinhando-accent'>Meses Conosco</p>
                              <p className='text-xs text-focinhando-accent/80 mt-1'>Obrigado por fazer parte!</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Quick Actions */}
               <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-4'>
                  <h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                     <FaPaw className='text-focinhando-accent' />
                     Acesso Rápido
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                     <button
                        onClick={() => navigate('/')}
                        className='group flex flex-col items-center gap-3 p-5 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all border border-blue-200 hover:border-blue-300'
                     >
                        <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                           <FaHome className='text-white text-xl' />
                        </div>
                        <span className='font-semibold text-gray-900 text-sm text-center'>Ver Pets Disponíveis</span>
                     </button>
                     <button
                        onClick={() => navigate('/about')}
                        className='group flex flex-col items-center gap-3 p-5 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all border border-purple-200 hover:border-purple-300'
                     >
                        <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                           <FaInfoCircle className='text-white text-xl' />
                        </div>
                        <span className='font-semibold text-gray-900 text-sm text-center'>Sobre Nós</span>
                     </button>
                     <button
                        onClick={() => navigate('/blog')}
                        className='group flex flex-col items-center gap-3 p-5 bg-linear-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all border border-green-200 hover:border-green-300'
                     >
                        <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                           <FaEdit className='text-white text-xl' />
                        </div>
                        <span className='font-semibold text-gray-900 text-sm text-center'>Ler Blog</span>
                     </button>
                     <button
                        onClick={() => navigate('/contact')}
                        className='group flex flex-col items-center gap-3 p-5 bg-linear-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all border border-orange-200 hover:border-orange-300'
                     >
                        <div className='w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform'>
                           <FaEnvelope className='text-white text-xl' />
                        </div>
                        <span className='font-semibold text-gray-900 text-sm text-center'>Entrar em Contato</span>
                     </button>
                  </div>

                  <button
                     onClick={handleLogout}
                     className='w-full bg-red-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group'
                  >
                     <FaSignOutAlt className='group-hover:translate-x-1 transition-transform' />
                     Sair da Conta
                  </button>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Profile
