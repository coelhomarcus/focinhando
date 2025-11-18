const Hero = () => {
   return (
      <section className='relative bg-[url(./assets/banners/banner4.jpg)] bg-top bg-cover border-b border-gray-200 py-20'>
         <div className='absolute inset-0 bg-black/50'></div>
         <div className='container mx-auto px-6 max-w-4xl text-center relative z-10'>
            <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6'>
               <span>Sobre nós</span>
            </div>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 leading-20'>
               Conectando <span className="text-focinhando-accent bg-black/60 border rounded-xl px-2">pets</span> com <br /> suas novas <span className="bg-black/60 border rounded-xl px-2 text-focinhando-green">famílias</span>
            </h1>
            <p className='text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed'>
               Uma plataforma moderna que facilita a adoção responsável de animais
            </p>
         </div>
      </section>
   )
}

export default Hero
