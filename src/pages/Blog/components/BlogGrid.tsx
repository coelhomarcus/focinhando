import type { BlogGridProps } from "../types";
import BlogCard from "./BlogCard";

const BlogGrid = ({
  publications,
  onSelectPublication,
  formatDate,
  getExcerpt,
}: BlogGridProps) => {
  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Últimas Publicações
        </h2>
        <p className="text-gray-600">
          {publications.length}{" "}
          {publications.length === 1
            ? "artigo disponível"
            : "artigos disponíveis"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publications.map((publication) => (
          <BlogCard
            key={publication.id}
            publication={publication}
            onClick={onSelectPublication}
            formatDate={formatDate}
            getExcerpt={getExcerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
