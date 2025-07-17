import { SquarePen } from "lucide-react";
import Label from "./Label";
import { useState } from "react";
import { MovieTambahan } from "@/types/MovieTambahan";
import SubmitButton from "./SubmitButton";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="edit group hover:outline-2 hover:outline-gray-300 p-2 rounded-md">
        <SquarePen
          className="text-white transition rounded-md"
          onClick={onClick}
        />
        <span className="invisible group-hover:visible text-md text-gray-200 transition-opacity duration-200">
          Edit
        </span>
      </div>
    </>
  );
}

// Form edit
export function FormEdit({
  movie,
  onClose,
  onSuccess,
}: {
  movie: MovieTambahan;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const updatedMovie = {
      id: movie.id,
      title: formData.get("title"),
      vote_average: Number(formData.get("vote_average")),
      release_date: formData.get("release_date"),
      genres: (formData.get("genres") as string)
        ?.split(",")
        .map((g) => ({ name: g.trim() })),
      overview: formData.get("overview"),
    };

    try {
      const res = await fetch("/api/movietambahan", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (!res.ok) throw new Error("Failed to update");

      const result = await res.json();
      console.log("Updated:", result);

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto h-[100dvh]">
      <div className="fixed inset-0 bg-black/60 z-40" />
      <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[95dvh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Data Film</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label text="Judul" />
          <input
            type="text"
            name="title"
            defaultValue={movie.title}
            placeholder="Judul"
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />

          <Label text="Berikan Ratings" />
          <input
            type="number"
            name="vote_average"
            step="0.5"
            defaultValue={movie.vote_average}
            placeholder="Rating"
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />

          <Label text="Tanggal Rilis" />
          <input
            type="date"
            name="release_date"
            defaultValue={movie.release_date}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />

          <Label text="Genre" />
          <input
            type="text"
            name="genres"
            defaultValue={movie.genres.map((genre) => genre.name).join(", ")}
            placeholder="Genre (pisahkan dengan koma)"
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />

          <Label text="Sinopsis" />
          <textarea
            name="overview"
            defaultValue={movie.overview}
            rows={4}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Batal
            </button>
            <SubmitButton
              text={loading ? "Menyimpan..." : "Simpan"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
