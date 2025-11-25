import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import type { BlogModalProps } from "../types";
import ShareButtons from "./ShareButtons";

const BlogModal = ({ publication, onClose, formatDate }: BlogModalProps) => {
  if (!publication) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-linear-to-r from-blue-600 to-blue-500 text-white">
          <div className="absolute top-0 right-0 p-4 z-10">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              aria-label="Fechar"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="px-6 pt-6 pb-5">
            <div className="max-w-3xl pr-16">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide">
                {publication.topic}
              </span>

              <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-tight">
                {publication.title}
              </h2>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 mt-1">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <FaCalendarAlt className="text-white/70" />
                <span>{formatDate(publication.createdAt)}</span>
              </div>
              <ShareButtons
                title={publication.title}
                url={window.location.href}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-3xl mx-auto p-6 md:p-8">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-200 shadow-lg">
              <img
                src={publication.img}
                alt={publication.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                {publication.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
