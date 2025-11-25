import { FaComments } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="relative bg-[url(./assets/banners/banner5.png)] bg-cover bg-center py-20 border-b border-gray-200">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <FaComments />
          <span>Entre em contato</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Estamos aqui para ajudar!
        </h1>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
          Dúvidas sobre adoção? Quer cadastrar um pet?
          <br /> Nossa equipe está pronta para te atender
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
