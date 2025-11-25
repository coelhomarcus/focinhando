import Banner from "@/assets/banners/banner.jpg";

const HeroSection = () => {
  return (
    <section
      className="h-[400px] bg-cover bg-center flex items-center justify-center text-focinhando-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${Banner})`,
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Encontre seu novo <span className="text-focinhando-green">amigo</span>
          !
        </h1>
        <p className="text-xl md:text-2xl">
          Uma plataforma simples para adoção de pets
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
