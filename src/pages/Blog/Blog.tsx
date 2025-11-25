import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import type { Publication } from "./types";

import BlogHero from "./components/BlogHero";
import BlogGrid from "./components/BlogGrid";
import BlogModal from "./components/BlogModal";
import CategoryFilter from "./components/CategoryFilter";
import LoadingState from "../../components/LoadingState";
import EmptyState from "./components/EmptyState";

const Blog = () => {
  const { apiBaseUrl } = useApi();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadPublications = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${apiBaseUrl}/publication/all-publications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.error) {
          console.error("Erro ao carregar publicações:", data.error);
          return;
        }

        setPublications(data.publications || []);
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, [apiBaseUrl]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getExcerpt = (text: string) => {
    if (!text) return "";
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  const categories = Array.from(
    new Set(publications.map((pub) => pub.topic).filter(Boolean))
  ).sort();

  const filteredPublications =
    selectedCategory === "all"
      ? publications
      : publications.filter((pub) => pub.topic === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <BlogHero />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {loading ? (
            <LoadingState text="Carregando publicações" />
          ) : publications.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {categories.length > 0 && (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              )}

              {filteredPublications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    Nenhuma publicação encontrada nesta categoria.
                  </p>
                </div>
              ) : (
                <BlogGrid
                  publications={filteredPublications}
                  onSelectPublication={setSelectedPublication}
                  formatDate={formatDate}
                  getExcerpt={getExcerpt}
                />
              )}
            </>
          )}
        </div>
      </section>

      <BlogModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        formatDate={formatDate}
      />
    </div>
  );
};

export default Blog;
