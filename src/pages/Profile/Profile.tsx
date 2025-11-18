import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useApi } from '@/hooks/useApi'
import type { User, UserComplement, EditData } from './types'

import ProfileHeader from './components/ProfileHeader'
import LoadingState from './components/LoadingState'
import PersonalInfoCard from './components/PersonalInfoCard'
import QuickActions from './components/QuickActions'

const Profile = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [user, setUser] = useState<User | null>(null)
   const [complement, setComplement] = useState<UserComplement | null>(null)
   const [loading, setLoading] = useState(true)
   const [editing, setEditing] = useState(false)
   const [editData, setEditData] = useState<EditData>({
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

      const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/
      if (editData.phoneNumber && !phoneRegex.test(editData.phoneNumber)) {
         setError('Formato de telefone inválido. Use: (00) 00000-0000')
         return
      }

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

   if (loading) {
      return <LoadingState />
   }

   return (
      <div className='min-h-screen bg-gray-50'>
         <section className='py-6 sm:py-8 md:py-12'>
            <div className='container mx-auto px-4 sm:px-6 max-w-5xl'>
               <div className='space-y-4 sm:space-y-6'>
                  <ProfileHeader user={user} complement={complement} />

                  <PersonalInfoCard
                     user={user}
                     complement={complement}
                     editing={editing}
                     setEditing={setEditing}
                     editData={editData}
                     setEditData={setEditData}
                     error={error}
                     saveSuccess={saveSuccess}
                     onSave={handleSave}
                  />

                  <QuickActions onNavigate={navigate} onLogout={handleLogout} />
               </div>
            </div>
         </section>
      </div>
   )
}

export default Profile
