import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [role, setRole] = useState("");

  const openCreateModal = () => setCreateModal(true);
  const closeCreateModal = () => setCreateModal(false);

  const openEditModal = (article) => {
    setCurrentArticle(article);
    setEditModal(true);
  };
  const closeEditModal = () => setEditModal(false);

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/articles");
      setArticles(response.data.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const handleArticleCreated = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };

  const handleArticleUpdated = (updatedArticle) => {
    setArticles(
      articles.map((article) =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/articles/${id}`);
      toast.success("Artikel berhasil dihapus");
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      toast.error("Gagal menghapus artikel");
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      {role === "admin" && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={openCreateModal}
        >
          Create
        </button>
      )}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={`https://articles-api.up.railway.app${article.image}`}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
              <p className="text-gray-600 mt-2">{article.description}</p>
              <Link
                to={`/articles/${article.slug}`}
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Read More
              </Link>
              {role === "admin" && (
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    onClick={() => openEditModal(article)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <CreateModal
        isOpen={createModal}
        onClose={closeCreateModal}
        onArticleCreated={handleArticleCreated}
      />
      {currentArticle && (
        <EditModal
          isOpen={editModal}
          onClose={closeEditModal}
          article={currentArticle}
          onArticleUpdated={handleArticleUpdated}
        />
      )}
    </div>
  );
};

export default Articles;
