import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${slug}`);
        setArticle(response.data.data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!article)
    return (
      <h1 className="text-red-500 text-xl font-bold">Article Not Found</h1>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded-md mt-4"
      />
      {/* <img
        src={`https://articles-api.up.railway.app${article.image}`}
        alt={article.title}
        className="w-full h-64 object-cover rounded-md mt-4"
      /> */}

      <p className="mt-4 text-gray-600 text-lg">{article.description}</p>
      <p className="mt-2 text-gray-500 text-sm">
        Category: {article.Category.name}
      </p>
      <div className="mt-4 text-gray-700 text-base">
        <p>{article.content}</p>
      </div>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}
