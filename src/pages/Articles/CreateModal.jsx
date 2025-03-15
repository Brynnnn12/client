import { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Menetapkan elemen root aplikasi agar modal dapat diakses dengan benar
Modal.setAppElement("#root");

// Schema validasi menggunakan Zod
const articleSchema = z.object({
  title: z
    .string()
    .min(3, "Judul artikel harus minimal 3 karakter")
    .max(50, "Judul artikel terlalu panjang"),
  description: z
    .string()
    .min(3, "Deskripsi artikel harus minimal 3 karakter")
    .max(200, "Deskripsi artikel terlalu panjang"),
  content: z
    .string()
    .min(3, "Isi artikel harus minimal 3 karakter")
    .max(10000, "Isi artikel terlalu panjang"),
  categoryId: z.string().nonempty("Kategori artikel harus dipilih"),
  image: z.any().optional(),
});

const CreateModal = ({ isOpen, onClose, onArticleCreated }) => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(articleSchema),
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Gagal mengambil kategori");
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("content", data.content);
      formData.append("categoryId", data.categoryId);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axiosInstance.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onArticleCreated(response.data?.data?.article);
      toast.success("Artikel berhasil dibuat");
      onClose();
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Gagal membuat artikel");
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset();
      fetchCategories();
    }
  }, [isOpen, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Article"
      className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-98 mx-auto mt-8 outline-none"
      overlayClassName="fixed inset-0 backdrop-blur-md flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Create New Article</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded mt-1"
            {...register("categoryId")}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded mt-1"
            onChange={(e) => setValue("image", e.target.files[0])}
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
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateModal;
