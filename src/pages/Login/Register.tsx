import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import Logo from '@/assets/logo.svg'
import { useApi } from '@/hooks/useApi'

const Register = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      setError('')
      setLoading(true)

      if (!name || !email || !password) {
         setError('Por favor, preencha todos os campos')
         setLoading(false)
         return
      }

      if (name.length < 2) {
         setError('O nome deve ter no mínimo 2 caracteres')
         setLoading(false)
         return
      }

      if (password.length < 8) {
         setError('A senha deve ter no mínimo 8 caracteres')
         setLoading(false)
         return
      }

      try {
         const response = await fetch(`${apiBaseUrl}/user/register`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
         })

         const data = await response.json()

         if (!response.ok) {
            setError(data.error || 'Erro ao criar conta')
            setLoading(false)
            return
         }

         setSuccess(true)

         setTimeout(() => {
            navigate('/login')
         }, 2000)
      } catch (err) {
         setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.')
         console.error('Register error:', err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='grid lg:grid-cols-2 min-h-screen'>
         <div className='hidden lg:block relative bg-gray-900 order-2 lg:order-1'>
            <div className='absolute inset-0 bg-[url(./assets/login/Register.jpg)] bg-cover bg-center opacity-75'></div>
            <div className='absolute inset-0 bg-linear-to-br from-focinhando-accent/20 to-transparent'></div>
            <div className='relative h-full flex items-center justify-center p-12 text-white'>
               <div className='max-w-lg'>
                  <h2 className='text-6xl font-bold mb-4 text-center text-shadow-lg'>
                     Comece sua <span className='text-focinhando-green-light'>jornada</span> conosco!
                  </h2>
                  <p className='text-lg opacity-90 text-center'>
                     Crie sua conta e tenha acesso a centenas de pets esperando por um lar.
                  </p>
               </div>
            </div>
         </div>

         <div className='bg-white flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2'>
            <div className='w-full max-w-md'>
               <div className='mb-8'>
                  <img src={Logo} alt="Logo" className='h-12 w-auto' />
               </div>

               <div className='mb-8'>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                     Crie sua conta
                  </h1>
                  <p className='text-gray-600'>
                     Preencha os dados abaixo para começar
                  </p>
               </div>

               {error && (
                  <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r'>
                     <p className='text-sm font-medium'>{error}</p>
                  </div>
               )}

               {success && (
                  <div className='mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r'>
                     <p className='text-sm font-medium'>Conta criada com sucesso! Redirecionando para o login...</p>
                  </div>
               )}

               <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                     <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                        Nome completo
                     </label>
                     <input
                        id="name"
                        type="text"
                        placeholder='João Silva'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-50'
                        autoComplete='name'
                     />
                  </div>

                  <div>
                     <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>
                        E-mail
                     </label>
                     <input
                        id="email"
                        type="email"
                        placeholder='seu@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-50'
                        autoComplete='email'
                     />
                  </div>

                  <div>
                     <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>
                        Senha
                     </label>
                     <input
                        id="password"
                        type="password"
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-focinhando-accent focus:border-transparent transition duration-200 disabled:opacity-50 disabled:bg-gray-50'
                        autoComplete='new-password'
                     />
                     <p className='mt-2 text-xs text-gray-500'>
                        Mínimo de 8 caracteres
                     </p>
                  </div>

                  <div className='flex items-start'>
                     <input
                        id="terms"
                        type="checkbox"
                        className='h-4 w-4 mt-1 text-focinhando-accent focus:ring-focinhando-accent border-gray-300 rounded'
                        required
                     />
                     <label htmlFor="terms" className='ml-2 block text-sm text-gray-700'>
                        Eu concordo com os{' '}
                        <a href="#" className='text-focinhando-accent hover:text-focinhando-accent-dark font-medium'>
                           Termos de Serviço
                        </a>{' '}
                        e{' '}
                        <a href="#" className='text-focinhando-accent hover:text-focinhando-accent-dark font-medium'>
                           Política de Privacidade
                        </a>
                     </label>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className='w-full py-3 px-4 bg-focinhando-accent text-white font-medium rounded-lg hover:bg-focinhando-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-focinhando-accent transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
                  >
                     {loading ? (
                        <span className='flex items-center justify-center'>
                           <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                           </svg>
                           Criando conta...
                        </span>
                     ) : 'Criar conta'}
                  </button>
               </form>

               <p className='mt-8 text-center text-sm text-gray-600'>
                  Já tem uma conta?{' '}
                  <Link to="/login" className='font-medium text-focinhando-accent hover:text-focinhando-accent-dark transition'>
                     Fazer login
                  </Link>
               </p>
            </div>
         </div>
      </div>
   )
}

export default Register
