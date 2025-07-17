"use client";

import { useState } from "react";
import { SquarePen } from "lucide-react";
import { MovieTambahan } from "@/types/MovieTambahan";
import { FormEdit } from "@/components/Edit";


type Props = {
  movie: MovieTambahan;
  onSuccess: () => void; // Tambahkan ini
};

export default function EditFilm({ movie, onSuccess }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieTambahan | null>(null);

  return (
    <>
      <button
        className="flex items-center gap-1 border-2 border-gray-500 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded px-2 py-1 text-sm"
        onClick={() => {
          setSelectedMovie(movie);
          setShowModal(true);
        }}
      >
        <SquarePen className="w-4 h-4" />
        Edit
      </button>

      {showModal && selectedMovie && (
        <FormEdit
          movie={selectedMovie}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            onSuccess(); // trigger fetchMovies
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
