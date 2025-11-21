import { Outlet } from 'react-router'
import Header from './Header/Header'

const Layout = () => {
   return (
      <div className='min-h-screen'>
         <Header />
         <Outlet />
      </div>
   )
}

export default Layout
