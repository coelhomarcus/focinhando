interface HeroSectionProps {
   userName: string | undefined
}

const HeroSection = ({ userName }: HeroSectionProps) => {
   return (
      <section className='relative bg-linear-to-br from-focinhando-accent via-[#ff7961] to-[#ff8a75] py-12 sm:py-16 md:py-20 overflow-hidden'>
         {/* Decorative elements */}
         <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full blur-3xl'></div>
            <div className='absolute bottom-10 right-10 w-48 h-48 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl'></div>
         </div>

         <div className='container mx-auto px-4 sm:px-6 relative z-10'>
            <div className='flex items-center justify-between max-w-6xl mx-auto'>
               <div className='w-full text-center'>
                  <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3'>
                     Olá, {userName?.split(' ')[0] || 'Usuário'}!
                  </h1>
                  <p className='text-white/90 text-sm sm:text-base md:text-lg'>
                     Gerencie suas informações e acompanhe sua jornada
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HeroSection
