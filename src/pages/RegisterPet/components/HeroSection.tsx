import type { HeroSectionProps } from "../types"

const HeroSection = ({ icon, title, description }: HeroSectionProps) => {
   return (
      <section className='relative bg-linear-to-br from-focinhando-accent via-[#ff7961] to-[#ff8a75] py-8 overflow-hidden'>
         <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full blur-3xl'></div>
            <div className='absolute bottom-10 right-10 w-48 h-48 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl'></div>
         </div>

         <div className='container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl'>
            <div className='text-center'>
               <div className='inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4'>
                  {icon}
               </div>
               <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3'>
                  {title}
               </h1>
               <p className='text-white/90 text-base sm:text-lg max-w-2xl mx-auto'>
                  {description}
               </p>
            </div>
         </div>
      </section>
   )
}

export default HeroSection
