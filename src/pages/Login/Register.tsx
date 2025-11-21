import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import { useApi } from '@/hooks/useApi'
import AuthLayout from '@/pages/Login/Auth/AuthLayout'
import AuthFormContainer from '@/pages/Login/Auth/AuthFormContainer'
import FormInput from '@/pages/Login/Auth/FormInput'
import AuthButton from '@/pages/Login/Auth/AuthButton'
import AlertMessage from '@/pages/Login/Auth/AlertMessage'

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
      <AuthLayout
         imageUrl="./assets/login/Register.jpg"
         imagePosition="left"
         title='Comece sua <span class="text-focinhando-green-light">jornada</span> conosco!'
         subtitle="Crie sua conta e tenha acesso a centenas de pets esperando por um lar."
      >
         <AuthFormContainer
            title="Crie sua conta"
            subtitle="Preencha os dados abaixo para começar"
         >
            {error && <AlertMessage type="error" message={error} />}
            {success && <AlertMessage type="success" message="Conta criada com sucesso! Redirecionando para o login..." />}

            <form onSubmit={handleSubmit} className='space-y-6'>
               <FormInput
                  id="name"
                  type="text"
                  label="Nome completo"
                  placeholder='João Silva'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  autoComplete='name'
               />

               <FormInput
                  id="email"
                  type="email"
                  label="E-mail"
                  placeholder='seu@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete='email'
               />

               <FormInput
                  id="password"
                  type="password"
                  label="Senha"
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete='new-password'
                  helperText="Mínimo de 8 caracteres"
               />

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

               <AuthButton loading={loading} loadingText="Criando conta..." disabled={loading}>
                  Criar conta
               </AuthButton>
            </form>

            <p className='mt-8 text-center text-sm text-gray-600'>
               Já tem uma conta?{' '}
               <Link to="/login" className='font-medium text-focinhando-accent hover:text-focinhando-accent-dark transition'>
                  Fazer login
               </Link>
            </p>
         </AuthFormContainer>
      </AuthLayout>
   )
}

export default Register
