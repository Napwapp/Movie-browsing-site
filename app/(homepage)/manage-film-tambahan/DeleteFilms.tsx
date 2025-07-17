"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  id: number;
  onSuccess: () => void; // callback jika berhasil menghapus
};

export default function DeleteFilms({ id, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Apakah anda yakin untuk menghapus film ini?");
    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await fetch("/api/movietambahan", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus film");
      }

      onSuccess(); // refresh data
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus film.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 border-2 border-red-500 bg-red-100 hover:bg-red-200 text-red-800 rounded px-2 py-1 text-sm"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}
