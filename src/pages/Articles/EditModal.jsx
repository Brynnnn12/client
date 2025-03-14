import { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const EditModal = ({ isOpen, onClose, article, onArticleUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (isOpen && article) {
      setTitle(article.title || "");
      setDescription(article.description || "");
      setContent(article.content || "");
      setCategoryId(article.categoryId || "");
      setImage(null);
      fetchCategories();
    }
  }, [isOpen, article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    try {
      const response = await axiosInstance.put(
        `/articles/${article.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onArticleUpdated(response.data.data.article);
      toast.success("Artikel berhasil diperbarui");
      onClose();
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Gagal memperbarui artikel");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Article"
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 backdrop-blur-md flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Edit Article</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded mt-1"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded mt-1"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
