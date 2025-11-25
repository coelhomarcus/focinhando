import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import ContactHero from "./components/ContactHero";
import ContactInfoCard from "./components/ContactInfoCard";
import ContactForm from "./components/ContactForm";
import ContactCTA from "./components/ContactCTA";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const Contact = () => {
  const { apiBaseUrl } = useApi();
  const [, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch(`${apiBaseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!data.error && data.user) {
          setUser(data.user);
          setUserData({
            fullName: data.user.name,
            email: data.user.email,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, [apiBaseUrl]);

  return (
    <div className="min-h-screen bg-white">
      <ContactHero />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Fale Conosco
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Tem alguma dúvida sobre adoção? Quer cadastrar um pet? Entre em
                contato conosco!
              </p>

              <div className="flex flex-col gap-6">
                <ContactInfoCard
                  icon={<FaEnvelope className="text-blue-600" />}
                  iconBgColor="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Email"
                  primaryText="contato@focinhando.com"
                  link={{
                    href: "mailto:contato@focinhando.com",
                    text: "Enviar email",
                  }}
                />

                <ContactInfoCard
                  icon={<FaWhatsapp className="text-green-600" />}
                  iconBgColor="bg-green-100"
                  iconColor="text-green-600"
                  title="WhatsApp"
                  primaryText="(94) 99999-0000"
                  link={{
                    href: "https://wa.me/5594999990000?text=Olá! Gostaria de saber mais sobre adoção de pets.",
                    text: "Chamar no WhatsApp",
                    external: true,
                  }}
                />

                <ContactInfoCard
                  icon={<FaMapMarkerAlt className="text-purple-600" />}
                  iconBgColor="bg-purple-100"
                  iconColor="text-purple-600"
                  title="Localização"
                  primaryText="Marabá - PA"
                  secondaryText="Atendemos todo o estado do Pará"
                />

                <ContactInfoCard
                  icon={<FaClock className="text-orange-600" />}
                  iconBgColor="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Horário de Atendimento"
                  primaryText="Segunda a sexta: 8h às 18h"
                  secondaryText="Sábado: 8h às 14h"
                />
              </div>
            </div>

            <ContactForm initialData={userData} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
};

export default Contact;
