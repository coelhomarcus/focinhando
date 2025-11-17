import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import Logo from '@/assets/logo.svg'
import { useApi } from '@/hooks/useApi'

const Login = () => {
   const { apiBaseUrl } = useApi()
   const navigate = useNavigate()
   const [email, setEmail] = useState('admin@email.com')
   const [password, setPassword] = useState('admin123')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      setError('')
      setLoading(true)

      // Validação básica
      if (!email || !password) {
         setError('Por favor, preencha todos os campos')
         setLoading(false)
         return
      }

      if (password.length < 8) {
         setError('A senha deve ter no mínimo 8 caracteres')
         setLoading(false)
         return
      }

      try {
         const response = await fetch(`${apiBaseUrl}/user/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         })

         const data = await response.json()

         if (!response.ok) {
            setError(data.error || 'Erro ao fazer login')
            setLoading(false)
            return
         }

         // Salvar token no localStorage
         if (data.token) {
            localStorage.setItem('authToken', data.token)
            setSuccess(true)

            // Redirecionar para a home após 1 segundo
            setTimeout(() => {
               navigate('/')
            }, 1000)
         }
      } catch (err) {
         setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.')
         console.error('Login error:', err)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='grid grid-cols-2 min-h-screen'>
         <div className='bg-focinhando-white p-10 flex flex-col'>
            <img src={Logo} alt="Logo" className='mb-auto max-w-[200px]' />

            <div className='flex flex-col justify-center flex-1'>
               <h1 className='text-5xl font-bold mb-2'>Bem-vindo de volta!</h1>
               <p className='text-focinhando-gray my-10'>Por favor, insira suas credenciais para fazer login.</p>

               <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                  {error && (
                     <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                        {error}
                     </div>
                  )}

                  {success && (
                     <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
                        Login realizado com sucesso! Redirecionando...
                     </div>
                  )}

                  <input
                     type="email"
                     placeholder='Digite seu e-mail'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     disabled={loading}
                     className='border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-[0_0_5px_#ee6551] p-3 disabled:opacity-50'
                  />
                  <input
                     type="password"
                     placeholder='Digite sua senha'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     disabled={loading}
                     className='border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-[0_0_5px_#ee6551] p-3 disabled:opacity-50'
                  />
                  <button
                     type="submit"
                     disabled={loading}
                     className='rounded-md bg-focinhando-accent text-focinhando-white p-3 cursor-pointer hover:bg-focinhando-accent-dark transition disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                     {loading ? 'Entrando...' : 'Login'}
                  </button>
                  <div className='text-center'>
                     Não tem uma conta? <Link to="/register" className='text-focinhando-accent hover:text-focinhando-accent-dark underline'>Registre-se</Link>
                  </div>
               </form>
            </div>
         </div>

         {/* Background */}
         <div className='bg-[url(./assets/login/Login.png)] bg-cover bg-center'>
         </div>
      </div>
   )
}

export default Login
