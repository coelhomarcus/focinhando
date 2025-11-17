import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Logo from '@/assets/logo.svg'
import { useApi } from '@/hooks/useApi'

interface UserComplement {
   city: string
   state: string
   phone: string
   user: {
      name: string
   }
}

const Header = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [userComplement, setUserComplement] = useState<UserComplement | null>(null)
   const [showMenu, setShowMenu] = useState(false)

   useEffect(() => {
      const loadUserData = async () => {
         const token = localStorage.getItem('authToken')
         if (!token) return

         try {
            const response = await fetch(`${apiBaseUrl}/user/complement`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            const data = await response.json()
            if (!data.error && data.complement) {
               setUserComplement(data.complement)
            }
         } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error)
         }
      }

      loadUserData()
   }, [apiBaseUrl])

   const handleLogout = () => {
      localStorage.removeItem('authToken')
      navigate('/login')
   }

   return (
      <header className='p-5 flex justify-between items-center'>
         <img src={Logo} alt="Logo" className='cursor-pointer' onClick={() => navigate('/')} />

         {/* NavBar */}
         <div className='bg-focinhando-gray border-2 border-focinhando-border flex items-center gap-15 h-[70px] p-5 rounded-[15px] *:hover:text-focinhando-accent'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Início</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Sobre</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Blog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Contato</NavLink>
            {localStorage.getItem('isAdmin') === 'true' && (
               <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Admin</NavLink>
            )}
         </div>

         {/* Profile */}
         <div className='relative'>
            <div
               className='bg-focinhando-gray border-2 border-focinhando-border flex items-center gap-2 h-[70px] p-5 rounded-[15px] cursor-pointer hover:bg-opacity-80 transition'
               onClick={() => setShowMenu(!showMenu)}
            >
               <img
                  src="https://ui-avatars.com/api/?name=User&background=ee6551&color=fff"
                  alt="Profile"
                  className='w-10 h-10 rounded-full'
               />
               <div>
                  <p className='font-bold text-focinhando-accent'>{userComplement ? userComplement.user.name : 'User'}</p>
                  {userComplement ? (
                     <p className='text-sm'>{userComplement.city} - {userComplement.state}</p>
                  ) : (
                     <p className='text-sm text-focinhando-gray'>Carregando...</p>
                  )}
               </div>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
               <div className='absolute right-0 mt-2 w-48 bg-focinhando-white border-2 border-focinhando-border rounded-xl shadow-lg overflow-hidden z-50'>
                  <button
                     className='w-full px-5 py-3 text-left hover:bg-focinhando-gray transition'
                     onClick={() => {
                        setShowMenu(false)
                        navigate('/profile')
                     }}
                  >
                     Meu Perfil
                  </button>
                  <button
                     className='w-full px-5 py-3 text-left hover:bg-focinhando-gray transition text-red-600'
                     onClick={handleLogout}
                  >
                     Sair
                  </button>
               </div>
            )}
         </div>
      </header>
   )
}

export default Header
