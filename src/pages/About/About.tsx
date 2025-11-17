const About = () => {
   return (
      <div className='min-h-screen'>
         {/* Hero Section */}
         <section
            className='bg-cover bg-center py-16 text-focinhando-white'
            style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200')`
            }}
         >
            <div className='container mx-auto px-5 text-center'>
               <h1 className='text-5xl md:text-6xl font-bold mb-4'>
                  Sobre o <span className='text-focinhando-accent'>Focinhando</span>
               </h1>
               <p className='text-xl md:text-2xl max-w-2xl mx-auto'>Uma plataforma simples para adoção de pets</p>
            </div>
         </section>

         {/* Mission Section */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-5'>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                  <div className='text-center p-10 bg-focinhando-gray rounded-3xl border-2 border-focinhando-border hover:shadow-2xl transition-shadow'>
                     <div className='text-6xl mb-5'>🏠</div>
                     <h3 className='text-2xl font-semibold mb-4'>O que fazemos</h3>
                     <p className='text-focinhando-text leading-relaxed'>
                        Ajudamos pessoas a encontrar pets para adoção de forma gratuita e segura.
                     </p>
                  </div>
                  <div className='text-center p-10 bg-focinhando-gray rounded-3xl border-2 border-focinhando-border hover:shadow-2xl transition-shadow'>
                     <div className='text-6xl mb-5'>❤️</div>
                     <h3 className='text-2xl font-semibold mb-4'>Por que existimos</h3>
                     <p className='text-focinhando-text leading-relaxed'>
                        Acreditamos que todo animal merece uma família e que a adoção deveria ser mais fácil.
                     </p>
                  </div>
                  <div className='text-center p-10 bg-focinhando-gray rounded-3xl border-2 border-focinhando-border hover:shadow-2xl transition-shadow'>
                     <div className='text-6xl mb-5'>🤝</div>
                     <h3 className='text-2xl font-semibold mb-4'>Como fazemos</h3>
                     <p className='text-focinhando-text leading-relaxed'>
                        Com transparência, verificação de perfis e foco na segurança dos animais.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className='py-20 bg-focinhando-gray'>
            <div className='container mx-auto px-5'>
               <h2 className='text-4xl font-bold text-center mb-12'>Por que usar o Focinhando?</h2>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow'>
                     <div className='text-5xl mb-5'>💰</div>
                     <h4 className='text-xl font-semibold mb-3'>É grátis</h4>
                     <p className='text-focinhando-text leading-relaxed'>
                        Não cobramos nada. A ideia é facilitar a adoção, não complicar.
                     </p>
                  </div>
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow'>
                     <div className='text-5xl mb-5'>💬</div>
                     <h4 className='text-xl font-semibold mb-3'>Contato direto</h4>
                     <p className='text-focinhando-text leading-relaxed'>
                        Você fala direto com quem tem o pet. Sem intermediários desnecessários.
                     </p>
                  </div>
                  <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow'>
                     <div className='text-5xl mb-5'>📱</div>
                     <h4 className='text-xl font-semibold mb-3'>Fácil de usar</h4>
                     <p className='text-focinhando-text leading-relaxed'>
                        Site simples, sem complicação. Você encontra o que precisa rapidamente.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section
            className='py-20 text-white text-center bg-cover bg-center bg-fixed'
            style={{
               backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.85), rgba(34, 34, 34, 0.85)), url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200')`
            }}
         >
            <div className='container mx-auto px-5'>
               <h2 className='text-4xl font-bold mb-12'>Alguns números</h2>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                  <div className='p-8 bg-black bg-opacity-40 rounded-2xl backdrop-blur-sm hover:transform hover:-translate-y-2 transition-transform'>
                     <div className='text-6xl font-extrabold text-focinhando-accent mb-3 drop-shadow-lg'>150+</div>
                     <div className='text-xl font-medium'>Pets adotados</div>
                  </div>
                  <div className='p-8 bg-black bg-opacity-40 rounded-2xl backdrop-blur-sm hover:transform hover:-translate-y-2 transition-transform'>
                     <div className='text-6xl font-extrabold text-focinhando-accent mb-3 drop-shadow-lg'>120+</div>
                     <div className='text-xl font-medium'>Famílias</div>
                  </div>
                  <div className='p-8 bg-black bg-opacity-40 rounded-2xl backdrop-blur-sm hover:transform hover:-translate-y-2 transition-transform'>
                     <div className='text-6xl font-extrabold text-focinhando-accent mb-3 drop-shadow-lg'>5</div>
                     <div className='text-xl font-medium'>Cidades</div>
                  </div>
               </div>
            </div>
         </section>

         {/* Team Section */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-5 text-center'>
               <h2 className='text-4xl font-bold mb-5'>Quem somos</h2>
               <p className='text-lg text-focinhando-text max-w-2xl mx-auto mb-12 leading-relaxed'>
                  Um time pequeno que gosta de animais e quer facilitar a vida de quem quer adotar.
               </p>
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                  <div className='p-8 rounded-3xl hover:shadow-2xl transition-shadow'>
                     <div className='w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-focinhando-accent'>
                        <img
                           src='https://ui-avatars.com/api/?name=Marcus+Coelho&background=ee6551&color=fff&size=128'
                           alt='Marcus Coelho'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-xl font-semibold mb-1'>Marcus Coelho</h4>
                     <p className='text-focinhando-accent font-semibold mb-2'>Fundador</p>
                     <span className='text-sm text-focinhando-text'>Desenvolvedor</span>
                  </div>
                  <div className='p-8 rounded-3xl hover:shadow-2xl transition-shadow'>
                     <div className='w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-focinhando-accent'>
                        <img
                           src='https://ui-avatars.com/api/?name=Vitoria+Leda&background=ee6551&color=fff&size=128'
                           alt='Vitoria Leda'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-xl font-semibold mb-1'>Vitoria Leda</h4>
                     <p className='text-focinhando-accent font-semibold mb-2'>Fundadora</p>
                     <span className='text-sm text-focinhando-text'>Desenvolvedora</span>
                  </div>
                  <div className='p-8 rounded-3xl hover:shadow-2xl transition-shadow'>
                     <div className='w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-focinhando-accent'>
                        <img
                           src='https://ui-avatars.com/api/?name=Luis+Otavio&background=ee6551&color=fff&size=128'
                           alt='Luis Otavio'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-xl font-semibold mb-1'>Luis Otavio</h4>
                     <p className='text-focinhando-accent font-semibold mb-2'>Desenvolvedor</p>
                     <span className='text-sm text-focinhando-text'>Cuida da parte técnica</span>
                  </div>
                  <div className='p-8 rounded-3xl hover:shadow-2xl transition-shadow'>
                     <div className='w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-focinhando-accent'>
                        <img
                           src='https://ui-avatars.com/api/?name=Angelo+Rodrigues&background=ee6551&color=fff&size=128'
                           alt='Angelo Rodrigues'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-xl font-semibold mb-1'>Angelo Rodrigues</h4>
                     <p className='text-focinhando-accent font-semibold mb-2'>Desenvolvedor</p>
                     <span className='text-sm text-focinhando-text'>Ajuda com as adoções</span>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className='py-20 bg-linear-to-br from-focinhando-accent to-[#ff8a75] text-white text-center'>
            <div className='container mx-auto px-5'>
               <h2 className='text-4xl font-bold mb-5'>Quer adotar um pet?</h2>
               <p className='text-xl mb-10 opacity-95'>É só clicar no botão abaixo. É simples e rápido.</p>
               <button
                  onClick={() => window.location.href = '/'}
                  className='bg-white text-focinhando-accent px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg'
               >
                  Ver pets disponíveis
               </button>
            </div>
         </section>
      </div>
   )
}

export default About
