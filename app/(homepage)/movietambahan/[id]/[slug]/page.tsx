import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { fetchMovieTambahanById } from "@/lib/MovieTambahan";

function getImageUrl(posterPath: string): string {
  return `${posterPath}`;
}

interface MoviePageParams {
  params: {
    id: string;
    slug: string;
  };
}

export default async function Page({ params: { id: idString } }: MoviePageParams) {
  const id = parseInt(idString);
  const movie = await fetchMovieTambahanById(id);
  
  if (isNaN(id)) {return notFound();}
  if (!movie) {return notFound();}

  return (
    <div className="max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:w-1/3 flex-shrink-0">
          <Image
            src={getImageUrl(movie.poster_path)}
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

          <hr />
        </div>
      </div>
    </div>
  );
}
