import { NavLink } from 'react-router'

const About = () => {
   return (
      <div className='min-h-screen bg-white'>
         {/* Hero Section */}
         <section className='relative bg-[url(./assets/home/lola.jpg)] bg-top bg-cover border-b border-gray-200 py-20'>
            {/* Overlay preto */}
            <div className='absolute inset-0 bg-black/50'></div>

            <div className='container mx-auto px-6 max-w-4xl text-center relative z-10'>
               <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6'>
                  <span>Sobre nós</span>
               </div>
               <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
                  Conectando pets com <br />suas novas famílias
               </h1>
               <p className='text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed'>
                  Uma plataforma moderna que facilita a adoção responsável de animais
               </p>
            </div>
         </section>

         {/* Mission Section */}
         <section className='py-20 bg-white'>
            <div className='container mx-auto px-6 max-w-6xl'>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        🏠
                     </div>
                     <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossa missão</h3>
                     <p className='text-gray-600 leading-relaxed'>
                        Conectar pessoas com pets que precisam de um lar, facilitando adoções responsáveis e seguras.
                     </p>
                  </div>
                  <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        ❤️
                     </div>
                     <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossa visão</h3>
                     <p className='text-gray-600 leading-relaxed'>
                        Um mundo onde todo animal tenha uma família amorosa e a adoção seja simples e acessível.
                     </p>
                  </div>
                  <div className='bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        🤝
                     </div>
                     <h3 className='text-xl font-semibold text-gray-900 mb-3'>Nossos valores</h3>
                     <p className='text-gray-600 leading-relaxed'>
                        Transparência, responsabilidade e foco no bem-estar dos animais em primeiro lugar.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className='py-20 bg-gray-50 border-y border-gray-200'>
            <div className='container mx-auto px-6 max-w-6xl'>
               <div className='text-center mb-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>Por que escolher o Focinhando?</h2>
                  <p className='text-gray-600 max-w-2xl mx-auto'>
                     Uma plataforma pensada para facilitar sua jornada de adoção
                  </p>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                     <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        💰
                     </div>
                     <h4 className='text-lg font-semibold text-gray-900 mb-3'>100% Gratuito</h4>
                     <p className='text-gray-600 leading-relaxed text-sm'>
                        Sem taxas ocultas. Nossa missão é facilitar a adoção, não lucrar com ela.
                     </p>
                  </div>
                  <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                     <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        💬
                     </div>
                     <h4 className='text-lg font-semibold text-gray-900 mb-3'>Contato Direto</h4>
                     <p className='text-gray-600 leading-relaxed text-sm'>
                        Converse diretamente com os tutores. Sem intermediários ou burocracias.
                     </p>
                  </div>
                  <div className='bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow'>
                     <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mb-5'>
                        📱
                     </div>
                     <h4 className='text-lg font-semibold text-gray-900 mb-3'>Interface Simples</h4>
                     <p className='text-gray-600 leading-relaxed text-sm'>
                        Design intuitivo e responsivo. Encontre seu pet em poucos cliques.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className='relative bg-[url(./assets/home/max.jpg)] bg-top bg-cover py-20'>
            {/* Overlay preto */}
            <div className='absolute inset-0 bg-black/60'></div>

            <div className='container mx-auto px-6 max-w-6xl relative z-10'>
               <div className='text-center mb-12'>
                  <h2 className='text-3xl font-bold text-white mb-4'>Nosso impacto</h2>
                  <p className='text-gray-200'>Números que contam nossa história</p>
               </div>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                     <div className='text-5xl font-bold text-white mb-2'>150+</div>
                     <div className='text-gray-100 font-medium'>Pets adotados</div>
                     <div className='text-sm text-gray-300 mt-2'>Encontraram um novo lar</div>
                  </div>
                  <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                     <div className='text-5xl font-bold text-white mb-2'>120+</div>
                     <div className='text-gray-100 font-medium'>Famílias felizes</div>
                     <div className='text-sm text-gray-300 mt-2'>Realizaram uma adoção</div>
                  </div>
                  <div className='text-center p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20'>
                     <div className='text-5xl font-bold text-white mb-2'>5</div>
                     <div className='text-gray-100 font-medium'>Cidades atendidas</div>
                     <div className='text-sm text-gray-300 mt-2'>E crescendo</div>
                  </div>
               </div>
            </div>
         </section>

         {/* Team Section */}
         <section className='py-20 bg-gray-50 border-t border-gray-200'>
            <div className='container mx-auto px-6 max-w-6xl text-center'>
               <h2 className='text-3xl font-bold text-gray-900 mb-4'>Nosso time</h2>
               <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
                  Pessoas apaixonadas por animais trabalhando para facilitar adoções
               </p>
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                  <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                        <img
                           src='https://ui-avatars.com/api/?name=Marcus+Coelho&background=374151&color=fff&size=80'
                           alt='Marcus Coelho'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-base font-semibold text-gray-900 mb-1'>Marcus Coelho</h4>
                     <p className='text-sm text-focinhando-accent font-medium mb-1'>Fundador</p>
                     <span className='text-xs text-gray-600'>Desenvolvedor Full Stack</span>
                  </div>
                  <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                        <img
                           src='https://ui-avatars.com/api/?name=Vitoria+Leda&background=374151&color=fff&size=80'
                           alt='Vitoria Leda'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-base font-semibold text-gray-900 mb-1'>Vitoria Leda</h4>
                     <p className='text-sm text-focinhando-accent font-medium mb-1'>Fundadora</p>
                     <span className='text-xs text-gray-600'>Desenvolvedora Frontend</span>
                  </div>
                  <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                        <img
                           src='https://ui-avatars.com/api/?name=Luis+Otavio&background=374151&color=fff&size=80'
                           alt='Luis Otavio'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-base font-semibold text-gray-900 mb-1'>Luis Otavio</h4>
                     <p className='text-sm text-focinhando-accent font-medium mb-1'>Desenvolvedor</p>
                     <span className='text-xs text-gray-600'>Infraestrutura & Backend</span>
                  </div>
                  <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors'>
                     <div className='w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200'>
                        <img
                           src='https://ui-avatars.com/api/?name=Angelo+Rodrigues&background=374151&color=fff&size=80'
                           alt='Angelo Rodrigues'
                           className='w-full h-full object-cover'
                        />
                     </div>
                     <h4 className='text-base font-semibold text-gray-900 mb-1'>Angelo Rodrigues</h4>
                     <p className='text-sm text-focinhando-accent font-medium mb-1'>Desenvolvedor</p>
                     <span className='text-xs text-gray-600'>Suporte & Adoções</span>
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className='py-20 bg-focinhando-accent-dark/80 border-t border-gray-200'>
            <div className='container mx-auto px-6 max-w-4xl text-center'>
               <div className='bg-gray-50 rounded-2xl border border-gray-200 p-12'>
                  <h2 className='text-3xl font-bold text-gray-900 mb-4'>Pronto para adotar?</h2>
                  <p className='text-gray-600 mb-8 max-w-xl mx-auto'>
                     Encontre seu novo melhor amigo entre dezenas de pets disponíveis para adoção
                  </p>
                  <div className='flex gap-4 justify-center flex-wrap'>
                     <NavLink
                        to='/'
                        className='bg-focinhando-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-focinhando-accent-dark cursor-pointer transition-colors'
                     >
                        Ver pets disponíveis
                     </NavLink>

                     <NavLink
                        to='/contact'
                        className='bg-white text-gray-900 px-8 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 cursor-pointer transition-colors'
                     >
                        Entre em contato
                     </NavLink>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default About
