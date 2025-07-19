"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tmdbApi } from "@/lib/tmdb";
import { Movie } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { MovieTambahan } from "@/types/MovieTambahan";
import MovieTambahanCard from "@/components/MovieTambahanCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState<(Movie | MovieTambahan)[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocalMovies = async (query: string) => {
    const res = await fetch("/api/movietambahan");
    const data = await res.json();
    const allMovies: MovieTambahan[] = data;

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const [tmdbData, localData] = await Promise.all([
          tmdbApi.searchMovies(query),
          searchLocalMovies(query),
        ]);

        const combined = [...(tmdbData.results || []), ...localData];
        setResults(combined);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Search results for: <span className="text-red-500">{query}</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((movie) => {
            const isLocal = "poster_path" in movie && movie.poster_path?.startsWith("/images");

            return isLocal ? (
              <MovieTambahanCard
                key={movie.id}
                movie={movie as MovieTambahan}
              />
            ) : (
              <MovieCard key={movie.id} movie={movie as Movie} />
            );
          })}
        </div>
      )}
    </div>
  );
}
