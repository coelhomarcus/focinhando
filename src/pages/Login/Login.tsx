import Logo from '@/assets/logo.svg'

const Login = () => {
   return (
      <div className='grid grid-cols-2 min-h-screen'>

         <div className='bg-focinhando-white p-10 flex flex-col'>
            <img src={Logo} alt="Logo" className='mb-auto max-w-[200px]' />


            <div className='flex flex-col justify-center flex-1'>
               <h1 className='text-5xl font-bold mb-2'>Bem-vindo de volta!</h1>
               <p className='text-focinhando-gray my-10'>Por favor, insira suas credenciais para fazer login.</p>
               <form className='flex flex-col gap-5'>
                  <input
                     type="email"
                     placeholder='Digite seu e-mail'
                     className='border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-[0_0_5px_#ee6551] p-3'
                  />
                  <input
                     type="password"
                     placeholder='Digite sua senha'
                     className='border-none rounded-md shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-[0_0_5px_#ee6551] p-3'
                  />
                  <button
                     type="submit"
                     className='rounded-md bg-focinhando-accent text-focinhando-white p-3 cursor-pointer hover:bg-focinhando-accent-dark transition'
                  >
                     Login
                  </button>
                  <div className='text-center'>
                     Não tem uma conta? <a href="#" className='text-focinhando-accent hover:text-focinhando-accent-dark underline'>Registre-se</a>
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
