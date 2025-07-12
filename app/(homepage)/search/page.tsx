'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tmdbApi } from '@/lib/tmdb';
import { Movie } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const data = await tmdbApi.searchMovies(query);
        setResults(data.results || []);
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
      <h1 className="text-2xl font-bold mb-4">Search results for: <span className="text-red-500">{query}</span></h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

