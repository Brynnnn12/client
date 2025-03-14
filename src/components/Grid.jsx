import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";

const Grid = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/articles");
      console.log(response.data); // Debugging
      setArticles(response.data.data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-black text-2xl font-bold md:text-4xl md:leading-tight">
          Insights
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Stay in the know with insights from industry experts.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading articles...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="group flex flex-col focus:outline-none"
                aria-label={`Read more about ${article.title}`}
              >
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                  <img
                    src={`http://localhost:5000${article.image}`}
                    alt={article.title}
                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                  />
                </div>
                <div className="mt-7">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-gray-800 dark:text-neutral-200">
                    {article.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 group-hover:underline font-medium">
                    Read more
                    <svg
                      className="shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No articles available</p>
          )}
        </div>
      )}
      <div className="flex justify-center mt-10">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-auto"
          to="/articles"
        >
          Go to Articles
        </Link>
      </div>
    </div>
  );
};

export default Grid;
