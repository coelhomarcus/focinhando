import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tem dúvidas sobre o processo de adoção?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para te ajudar em todas as etapas. Entre em
            contato pelos nossos canais
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5594999990000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp />
              <span>Falar no WhatsApp</span>
            </a>
            <a
              href="mailto:contato@focinhando.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-medium hover:border-gray-400 transition-colors"
            >
              <FaEnvelope />
              <span>Enviar Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
