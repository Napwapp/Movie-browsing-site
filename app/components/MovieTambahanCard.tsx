// This component file is only intended for movie data that I created myself.
import Link from "next/link";
import Image from "next/image";
import { MovieTambahan } from "@/types/MovieTambahan";
import { Star, Calendar } from "lucide-react";
import { slugify } from "@/lib/slugify";

type Props = {
  movie: MovieTambahan;
};

export default function MovieTambahanCard({ movie }: Props) {
  const slug = slugify(movie.title);

  return (
    <>
      <div className="movie-card group cursor-pointer relative">
        <Link href={`/movietambahan/${movie.id}/${slug}`}>
          {/* Poster & Info */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.poster_path}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          <div className="p-4 relative">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
              {movie.title}
            </h3>

            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />

              <div className="truncate max-w-[140px] ">
                {movie.genres.join(", ")}
              </div>

              <span>{new Date(movie.release_date).getFullYear()}</span>

              {/* Rating */}
              <div className="absolute bottom-2 right-2 flex items-center gap-2 z-10">
                <div className="bg-gray-800 text-white px-3 py-2 rounded-full text-xs flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
