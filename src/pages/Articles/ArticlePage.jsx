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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (!article)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-2xl font-bold">Article Not Found</h1>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Artikel */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-600 text-lg">
          Published in{" "}
          <span className="font-semibold text-blue-600">
            {article.Category.name}
          </span>
        </p>
      </div>

      {/* Gambar Artikel */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg mb-10">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Konten Artikel */}
      <div className="prose prose-lg max-w-3xl mx-auto">
        {/* <p className="text-gray-700 text-xl leading-relaxed mb-6">
          {article.description}
        </p> */}
        <div className="text-gray-700 text-lg leading-relaxed">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Tombol Kembali */}
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
