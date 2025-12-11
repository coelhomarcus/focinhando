import type { BlogCardProps } from "../types";

const BlogCard = ({
  publication,
  onClick,
  formatDate,
  getExcerpt,
}: BlogCardProps) => {
  return (
    <article
      onClick={() => onClick(publication)}
      className="group bg-blue-50 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden bg-blue-50">
        <img
          src={publication.img}
          alt={publication.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
          {publication.topic}
        </span>
      </div>
      <div className="p-6 bg-linear-to-b from-white to-blue-50/30">
        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {publication.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {getExcerpt(publication.text)}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-blue-100">
          <span className="text-xs text-gray-500">
            {formatDate(publication.createdAt)}
          </span>
          <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
            Ler mais →
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
