import { FaEdit } from "react-icons/fa";

const BlogHero = () => {
  return (
    <section className="relative bg-[url(./assets/banners/banner2.jpg)] bg-cover bg-center py-20 border-b border-gray-200">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <FaEdit />
          <span>Blog</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Dicas e Histórias
        </h1>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
          Conteúdos sobre adoção responsável, cuidados com pets e mais
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
