import Logo from '@/assets/logo.svg'
import { NavLink } from 'react-router'

const Header = () => {
   return (
      <header className='p-5 flex justify-between items-center'>
         <img src={Logo} alt="Logo" />

         {/* NavBar */}
         <div className='bg-focinhando-gray border-2 border-focinhando-border flex items-center gap-15 h-[70px] p-5 rounded-[15px] *:hover:text-focinhando-accent'>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Início</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Sobre</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Blog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-focinhando-accent underline font-bold' : ''}>Contato</NavLink>
         </div>

         {/* Profile */}
         <div className='bg-focinhando-gray border-2 border-focinhando-border flex items-center gap-2 h-[70px] p-5 rounded-[15px] *:hover:text-focinhando-accent'>
            <img
               src="https://avatars.githubusercontent.com/u/52766854?v=4"
               alt="Profile"
               className='w-10 h-10 rounded-full'
            />
            <div>
               <p className='font-bold text-focinhando-accent'>John Doe</p>
               <p className='text-sm'>Administrador</p>
               {/* <p className='text-sm'>Marabá - PA</p> */}
            </div>
         </div>
      </header>
   )
}

export default Header
