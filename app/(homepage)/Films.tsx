"use client";

import { useState, useEffect } from "react";
import { MovieTambahan } from "@/types/MovieTambahan";
import MovieTambahanCard from "@/components/MovieTambahanCard";
import Link from "next/link";

export default function Films() {
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

  return (
    <>
      {/* Film Tambahan */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Film Tambahan</h1>
          <Link
            href="/manage-film-tambahan"
            className="text-blue-600 border-2 border-red-500 text-red-500 hover:bg-red-100 rounded-md text-xl p-3"
          >
            Manage data
          </Link>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieTambahanCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
