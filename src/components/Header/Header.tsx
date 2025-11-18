import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import Logo from '@/assets/logo.svg'
import { useApi } from '@/hooks/useApi'

interface User {
   id: string
   name: string
   email: string
   role: string
   createdAt: string
   updatedAt: string
}

const Header = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [user, setUser] = useState<User | null>(null)
   const [showUserMenu, setShowUserMenu] = useState(false)
   const [showMobileMenu, setShowMobileMenu] = useState(false)

   useEffect(() => {
      const loadUserData = async () => {
         const token = localStorage.getItem('authToken')
         if (!token) return

         try {
            const response = await fetch(`${apiBaseUrl}/user`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })
            const data = await response.json()
            if (!data.error && data.user) {
               setUser(data.user)
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
      <header className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
         <div className='container mx-auto px-6'>
            <div className='flex justify-between items-center h-20'>
               {/* Logo */}
               <div className='flex items-center'>
                  <img
                     src={Logo}
                     alt="Focinhando Logo"
                     className='h-10 cursor-pointer hover:opacity-80 transition-opacity'
                     onClick={() => navigate('/')}
                  />
               </div>

               {/* Desktop Navigation */}
               <nav className='hidden md:flex items-center gap-1'>
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                  >
                     Início
                  </NavLink>
                  <NavLink
                     to="/about"
                     className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                  >
                     Sobre
                  </NavLink>
                  <NavLink
                     to="/blog"
                     className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                  >
                     Blog
                  </NavLink>
                  <NavLink
                     to="/contact"
                     className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                  >
                     Contato
                  </NavLink>
                  {localStorage.getItem('isAdmin') === 'true' && (
                     <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                           `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                              ? 'bg-focinhando-accent-dark text-white'
                              : 'text-focinhando-accent hover:bg-focinhando-accent/10'
                           }`
                        }
                     >
                        Admin
                     </NavLink>
                  )}
               </nav>

               {/* User Profile & Mobile Menu Button */}
               <div className='flex items-center gap-3'>
                  {/* Desktop Profile */}
                  <div className='hidden md:block relative'>
                     <button
                        className='flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 hover:border-focinhando-accent hover:bg-focinhando-accent/5 transition-all min-w-[200px]'
                        onClick={() => setShowUserMenu(!showUserMenu)}
                     >
                        {user ? (
                           <>
                              <img
                                 src={`https://ui-avatars.com/api/?name=${user.name}&background=ee6551&color=fff&size=40`}
                                 alt="Profile"
                                 className='w-9 h-9 rounded-full border-2 border-white shadow-sm shrink-0'
                              />
                              <div className='text-left flex-1 min-w-0'>
                                 <p className='text-sm font-semibold text-gray-900 truncate'>{user.name}</p>
                                 <p className='text-xs text-gray-500'>
                                    {user.role === 'admin' ? 'Administrador' : 'Membro'}
                                 </p>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className='w-9 h-9 rounded-full bg-gray-200 animate-pulse shrink-0'></div>
                              <div className='text-left flex-1 min-w-0 space-y-2'>
                                 <div className='h-3.5 bg-gray-200 rounded animate-pulse w-20'></div>
                                 <div className='h-3 bg-gray-200 rounded animate-pulse w-16'></div>
                              </div>
                           </>
                        )}
                        <svg
                           className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${showUserMenu ? 'rotate-180' : ''}`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>

                     {/* User Dropdown Menu */}
                     {showUserMenu && (
                        <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden'>
                           <div className='px-4 py-3 border-b border-gray-100'>
                              <p className='text-sm font-semibold text-gray-900'>{user?.name}</p>
                              <p className='text-xs text-gray-500 mt-0.5'>{user?.email}</p>
                           </div>
                           <button
                              className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent transition-colors flex items-center gap-2'
                              onClick={() => {
                                 setShowUserMenu(false)
                                 navigate('/profile')
                              }}
                           >
                              <span>👤</span>
                              <span>Meu Perfil</span>
                           </button>
                           <button
                              className='w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2'
                              onClick={handleLogout}
                           >
                              <span>🚪</span>
                              <span>Sair</span>
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     className='md:hidden p-2 rounded-lg hover:bg-focinhando-accent/10 transition-colors'
                     onClick={() => setShowMobileMenu(!showMobileMenu)}
                     aria-label='Menu'
                  >
                     {showMobileMenu ? (
                        <svg className='w-6 h-6 text-focinhando-accent' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     ) : (
                        <svg className='w-6 h-6 text-gray-700' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                     )}
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
               <div className='md:hidden border-t border-gray-200 py-4 space-y-1 animate-fadeIn'>
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                     onClick={() => setShowMobileMenu(false)}
                  >
                     🏠 Início
                  </NavLink>
                  <NavLink
                     to="/about"
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                     onClick={() => setShowMobileMenu(false)}
                  >
                     ℹ️ Sobre
                  </NavLink>
                  <NavLink
                     to="/blog"
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                     onClick={() => setShowMobileMenu(false)}
                  >
                     📝 Blog
                  </NavLink>
                  <NavLink
                     to="/contact"
                     className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                           ? 'bg-focinhando-accent text-white'
                           : 'text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent'
                        }`
                     }
                     onClick={() => setShowMobileMenu(false)}
                  >
                     💬 Contato
                  </NavLink>
                  {localStorage.getItem('isAdmin') === 'true' && (
                     <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                           `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                              ? 'bg-focinhando-accent-dark text-white'
                              : 'text-focinhando-accent hover:bg-focinhando-accent/10'
                           }`
                        }
                        onClick={() => setShowMobileMenu(false)}
                     >
                        ⚙️ Admin
                     </NavLink>
                  )}
                  <div className='pt-4 mt-4 border-t border-gray-200'>
                     <div className='flex items-center gap-3 px-4 py-3 bg-focinhando-accent/5 rounded-lg mb-2 min-h-[66px]'>
                        {user ? (
                           <>
                              <img
                                 src={`https://ui-avatars.com/api/?name=${user.name}&background=ee6551&color=fff&size=40`}
                                 alt="Profile"
                                 className='w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0'
                              />
                              <div className='flex-1 min-w-0'>
                                 <p className='text-sm font-semibold text-gray-900 truncate'>{user.name}</p>
                                 <p className='text-xs text-gray-500'>
                                    {user.role === 'admin' ? 'Administrador' : 'Membro'}
                                 </p>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse shrink-0'></div>
                              <div className='flex-1 min-w-0 space-y-2'>
                                 <div className='h-3.5 bg-gray-300 rounded animate-pulse w-24'></div>
                                 <div className='h-3 bg-gray-300 rounded animate-pulse w-20'></div>
                              </div>
                           </>
                        )}
                     </div>
                     <button
                        className='w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-focinhando-accent/10 hover:text-focinhando-accent rounded-lg transition-colors'
                        onClick={() => {
                           setShowMobileMenu(false)
                           navigate('/profile')
                        }}
                     >
                        👤 Meu Perfil
                     </button>
                     <button
                        className='w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors'
                        onClick={handleLogout}
                     >
                        🚪 Sair
                     </button>
                  </div>
               </div>
            )}
         </div>
      </header>
   )
}

export default Header
