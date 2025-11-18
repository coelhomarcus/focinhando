import { Routes, Route, Navigate } from 'react-router'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register'
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Blog from "./pages/Blog/Blog"
import Contact from "./pages/Contact/Contact"
import Profile from "./pages/Profile/Profile"
import RegisterPet from "./pages/RegisterPet/RegisterPet"
import Admin from "./pages/Admin/Admin"
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import { ApiProvider } from './contexts/ApiProvider'
import { UserProvider } from './contexts/UserProvider'

const API_BASE_URL = 'https://focinhando-backend.up.railway.app'

const App = () => {
   return (
      <ApiProvider apiBaseUrl={API_BASE_URL}>
         <UserProvider>
            <Routes>
               <Route path="/" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <Home />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/about" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <About />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/blog" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <Blog />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/contact" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <Contact />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/profile" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <Profile />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/register-pet" element={
                  <ProtectedRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <RegisterPet />
                     </div>
                  </ProtectedRoute>
               } />
               <Route path="/admin" element={
                  <AdminRoute>
                     <div className='min-h-screen'>
                        <Header />
                        <Admin />
                     </div>
                  </AdminRoute>
               } />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </UserProvider>
      </ApiProvider>
   )
}

export default App
