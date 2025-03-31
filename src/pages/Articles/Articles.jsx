import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
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

  const role = useSelector((state) => state.auth.userInfo?.role); // Get role from Redux store

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

  const handleDelete = (id) => {
    toast.info(
      <div className="text-center">
        <p className="mb-2">Apakah Anda yakin ingin menghapus kategori ini?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={async () => {
              try {
                await axiosInstance.delete(`/articles/${id}`);
                setArticles(articles.filter((article) => article.id !== id));
                toast.dismiss();
                toast.success("Artikel berhasil dihapus", {
                  position: "top-right",
                });
              } catch (error) {
                toast.error("Gagal menghapus artikel", {
                  position: "top-right",
                });
                console.error("Error deleting article:", error);
              }
            }}
          >
            Hapus
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            Batal
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    );
  };

  useEffect(() => {
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
                src={article.image}
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
                <div className="flex gap-2 mt-4">
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
