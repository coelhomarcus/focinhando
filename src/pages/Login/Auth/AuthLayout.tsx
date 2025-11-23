import type { AuthLayoutProps } from '../types'

const AuthLayout = ({ children, imageUrl, imagePosition = 'right', title, subtitle }: AuthLayoutProps) => {
   const isImageLeft = imagePosition === 'left'

   return (
      <div className='grid lg:grid-cols-2 min-h-screen'>
         <div className={`hidden lg:block relative bg-gray-900 ${isImageLeft ? 'order-1' : 'order-2'}`}>
            <div 
               className='absolute inset-0 opacity-75'
               style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
               }}
            ></div>
            <div className='absolute inset-0 bg-linear-to-br from-focinhando-accent/50 to-transparent'></div>
            <div className='relative h-full flex items-center justify-center p-12 text-white'>
               <div className='max-w-lg'>
                  <h2 className='text-6xl font-bold mb-4 text-center text-shadow-lg' dangerouslySetInnerHTML={{ __html: title }} />
                  <p className='text-lg opacity-90 text-center'>{subtitle}</p>
               </div>
            </div>
         </div>

         <div className={`bg-white flex items-center justify-center p-8 lg:p-12 ${isImageLeft ? 'order-2' : 'order-1'}`}>
            {children}
         </div>
      </div>
   )
}

export default AuthLayout
