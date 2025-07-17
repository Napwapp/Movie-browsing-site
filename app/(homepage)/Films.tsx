"use client";

import { useState, useEffect } from "react";
import { AddButton } from "@/components/Button";
import SubmitButton from "@/components/SubmitButton";
import Label from "@/components/Label";
import { MovieTambahan } from "@/types/MovieTambahan";
import MovieTambahanCard from "@/components/MovieTambahanCard";

export default function Films() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState<MovieTambahan[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movietambahan");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Gagal mengambil data film tambahan", err);
      }
    };

    fetchMovies();
  }, []);

  // Submit add Movies
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/movietambahan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // fallback jika bukan JSON
        throw new Error(errorText || "Gagal menambahkan film");
      }

      const data = await response.json();

      console.log("Berhasil ditambahkan:", data);
      setMovies((prev) => [...prev, data.data]);

      setShowModal(false);
      form.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        alert("Gagal menambahkan film: " + err.message);
      } else {
        console.error("Unknown error occurred.");
        alert("Terjadi kesalahan yang tidak diketahui");
      }
    }
  };

  return (
    <>
      {/* Film Tambahan */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Film Tambahan</h1>
          <AddButton text="Tambah Film" onClick={() => setShowModal(true)} />
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieTambahanCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Modal untuk add data */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto h-[100dvh]">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 z-40" />

          {/* Konten Modal */}
          <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[95dvh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Tambah Data Film</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >

              <Label text="Judul" />
              <input
                type="text"
                name="title"
                placeholder="Judul"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                required
              />
              <div>
                <Label text="Upload Poster" />
                <input
                  type="file"
                  name="poster_path"
                  id="poster_path"
                  accept="image/*"
                  placeholder="Upload poster"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md"
                  required
                />
              </div>

              <Label text="Berikan Ratings" />
              <input
                type="number"
                name="vote_average"
                step="0.5"
                placeholder="Rating"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                required
              />

              <Label text="Masukkan Tanggal Rilis" />
              <input
                type="date"
                name="release_date"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                required
              />

              <Label text="Masukkan Genre" />
              <input
                type="text"
                name="genres"
                placeholder="Genre (pisahkan dengan koma)"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                required
              />
              
              <Label text="Masukkan Sinopsis" />
              <textarea
                name="overview"
                placeholder="Sinopsis"
                rows={4}
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                required
              />

              {/* Tombol aksi */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Batal
                </button>
                <SubmitButton text="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
