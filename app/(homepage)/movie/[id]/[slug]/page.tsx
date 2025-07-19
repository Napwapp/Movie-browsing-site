import { tmdbApi, getImageUrl } from "@/lib/tmdb";
import { Star, Youtube, CornerUpRight } from "lucide-react";
import { Movie } from "@/lib/tmdb";

import Button from "@/components/Button";
import Image from "next/image";

// Interface for Trailer
interface Video {
  id: string;
  key: string;
  name: string;
  site: string; // "YouTube"
  type: string; // "Trailer", "Teaser", etc.
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie: Movie = await tmdbApi.getMovieDetails(id);
  const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`;
  const videos = movie.videos?.results as Video[];

  const trailer = videos?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const youtubeUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : null;

  return (
    <div className="max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 flex-shrink-0">
          <Image
            src={getImageUrl(movie.poster_path || "/images/no-preview-image.webp")}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 mb-2 font-medium">
            Genres:{" "}
            <span className="text-gray-500">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </span>
          </p>

          <p className="text-gray-700 mb-2 font-medium">
            Release Date:{" "}
            <span className="text-gray-500">{movie.release_date}</span>
          </p>

          <div className="flex items-center text-yellow-500 mb-2">
            <Star className="h-5 w-5 mr-1" />
            <span className="font-semibold">{movie.vote_average} / 10</span>
          </div>
          <hr />

          {/* Overview */}
          <div className="my-4 italic">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-black leading-relaxed">{movie.overview}</p>
          </div>

          {/* Button */}
          <div className="flex flex-wrap gap-4 mb-4">
            {youtubeUrl && (
              <Button
                text="Watch Trailer"
                icon={<Youtube className="h-5 w-5" />}
                href={youtubeUrl}
              />
            )}

            <Button
              text="View on TMDb"
              icon={<CornerUpRight className="h-5 w-5" />}
              href={tmdbUrl}
            />
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}
