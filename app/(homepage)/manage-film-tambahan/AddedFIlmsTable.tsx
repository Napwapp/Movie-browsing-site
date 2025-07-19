"use client";

import { useEffect, useState } from "react";
import { MovieTambahan } from "@/types/MovieTambahan";
import { Star } from "lucide-react";
import Image from "next/image";
import EditFilms from "./EditFilm";
import DeleteFilms from "./DeleteFilms";

export default function AddedFilmsTable() {
  const [movies, setMovies] = useState<MovieTambahan[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movietambahan");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="mb-8 w-full overflow-x-auto mx-auto px-4">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Poster</th>
            <th className="px-4 py-2">Judul</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Tanggal Rilis</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Sinopsis</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((film, index) => (
            <tr key={film.id} className="border-b border-gray-400">
              <td className="px-4 py-3">{index + 1}</td>

              <td className="px-4 py-3">
                <Image
                  src={film.poster_path || "/images/no-preview-image.webp"}
                  alt={film.title}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
              </td>
              <td className="px-4 py-3">{film.title}</td>

              <td className="px-4 py-3">
                <div className="text-yellow-400 py-2 rounded-full text-xl flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{film.vote_average.toFixed(1)}</span>
                </div>
              </td>

              <td className="px-4 py-3">
                {new Date(film.release_date).toLocaleDateString("id-ID")}
              </td>

              <td className="px-4 py-3">
                {film.genres.join(", ")}
              </td>

              <td className="px-4 py-3">
                <p className="text-gray-700">
                  {expandedRow === film.id || film.overview.length <= 25
                    ? film.overview
                    : film.overview.slice(0, 25) + "..."}
                </p>

                {film.overview.length > 25 && (
                  <button
                    className="text-blue-500 underline text-sm mt-1"
                    onClick={() =>
                      setExpandedRow(expandedRow === film.id ? null : film.id)
                    }
                  >
                    {expandedRow === film.id
                      ? "Sembunyikan"
                      : "Lihat selengkapnya"}
                  </button>
                )}
              </td>

              <td className="px-4 py-3 flex items-center gap-2 h-full">
                <EditFilms movie={film} onSuccess={fetchMovies} />
                <DeleteFilms id={film.id} onSuccess={fetchMovies} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
