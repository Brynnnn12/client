import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Nama kategori harus minimal 3 karakter")
    .max(50, "Nama kategori terlalu panjang"),
});

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector((state) => state.auth.userInfo?.role); // Get role from Redux store

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(categorySchema) });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data.data.categories);
    } catch {
      toast.error("Gagal memuat kategori");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await axiosInstance.put(`/categories/${editing.id}`, data);
        toast.success("Kategori berhasil diperbarui");
      } else {
        await axiosInstance.post("/categories", data);
        toast.success("Kategori berhasil ditambahkan");
      }
      reset();
      setEditing(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const handleEdit = (category) => {
    setEditing(category);
    setValue("name", category.name);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await axiosInstance.delete(`/categories/${id}`);
        toast.success("Kategori berhasil dihapus");
        fetchCategories();
      } catch {
        toast.error("Gagal menghapus kategori");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Manajemen Kategori
      </h1>
      {role === "admin" && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "Edit Kategori" : "Tambah Kategori Baru"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Kategori
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : editing ? "Update" : "Tambah"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setEditing(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h2 className="text-lg font-semibold p-4 border-b">Daftar Kategori</h2>
        {isLoading ? (
          <div className="text-center p-6 text-gray-500">
            Memuat kategori...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            Belum ada kategori
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="font-medium text-gray-800">
                  {category.name}
                </span>
                {role === "admin" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
